import { z } from "zod";
import { eq, sql } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        task: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { session, db } = ctx;

    const allTasks = await db.query.tasks.findMany({
      where: ((tasks, { eq }) => eq(tasks.createdById, session.user.id)),
      orderBy: (fields, { asc }) => asc(fields.createdAt),
    });

    return allTasks;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;

      const taskIndex = await ctx.db.query.tasks.findFirst({
        where: ((tasks, { eq, and }) => and(eq(tasks.id, input.id), eq(tasks.createdById, session.user.id)))
      });

      if (!taskIndex) {
        throw new Error("Task not found");
      }

      const deletedTask = await ctx.db.delete(tasks)
        .where(eq(tasks.id, input.id))
        .returning({ id: tasks.id });

      return { success: true, deletedTask };

    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      const { session } = ctx;

      const taskIndex = await ctx.db.query.tasks.findFirst({
        where: ((tasks, { eq, and }) => and(eq(tasks.id, input.id), eq(tasks.createdById, session.user.id)))
      });

      if (!taskIndex) {
        throw new Error("Task not found");
      }

      const updatedTask = await ctx.db.update(tasks)
        .set({ task: input.name })
        .where(eq(tasks.id, input.id))
        .returning({ id: tasks.id });

      return { success: true, updatedTask };

    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { session, db } = ctx;

      // Ensure the task belongs to the current user
      const task = await db.query.tasks.findFirst({
        where: ((tasks, { eq, and }) =>
          and(eq(tasks.id, input.id), eq(tasks.createdById, session.user.id))
        ),
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const updatedTask = await db.update(tasks)
        .set({ completedAt: input.completed ? sql`CURRENT_TIMESTAMP` : null })
        .where(eq(tasks.id, input.id))
        .returning({ id: tasks.id, completedAt: tasks.completedAt });

      return { success: true, updatedTask };
    }),
});
