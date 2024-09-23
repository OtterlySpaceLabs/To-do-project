import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const tasks: { id: number, task: string }[] = [];

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const newTask = {
        id: tasks.length + 1,
        task: input.name
      };

      tasks.push(newTask);
      return newTask;
    }),

  getLatest: publicProcedure.query(async () => {
    if (tasks.length === 0) {
      return null;
    }

    const latestTask = tasks[tasks.length - 1];
    return latestTask;
  }),

  getAll: publicProcedure.query(async () => {
    return tasks;
  }),

  delete: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input }) => {
    const taskIndex = tasks.findIndex(task => task.id === input.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }),

  update: publicProcedure
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
