import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { tasks } from "~/server/db/schema";
// const tasks: { id: number, task: string }[] = [];


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
    const { session } = ctx;
  
    const tasks = await ctx.db.query.tasks.findMany({
      where: ((tasks, { eq }) => eq(tasks.createdById, session.user.id))
    });
    return tasks;
  }),

  delete: protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input }) => {
    const taskIndex = tasks.findIndex(task => task.id === input.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }),

  update: protectedProcedure
  .input(z.object({ id: z.number(), name: z.string().min(1) }))
  .mutation(async ({ input }) => {
    const taskIndex = tasks.findIndex(task => task.id === input.id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }

    const taskToUpdate = tasks[taskIndex];
    if (taskToUpdate) {
      taskToUpdate.task = input.name;
      return taskToUpdate;
    } else {
      throw new Error("Task is undefined");
    }
  }),
});
