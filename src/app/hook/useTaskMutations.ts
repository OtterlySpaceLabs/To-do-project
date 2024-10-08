import { api } from "~/trpc/react";

export const useTaskMutations = (
  utils: ReturnType<typeof api.useUtils>,
  setTask: React.Dispatch<React.SetStateAction<string>>,
) => {
  const createTask = api.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
      setTask("");
    },
  });

  const deleteTaskMutation = api.task.delete.useMutation({
    onSuccess: async () => {
      await utils.task.getAll.invalidate();
    },
  });

  const updateTaskMutation = api.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.getAll.invalidate();
    },
  });

  return {
    createTask,
    deleteTaskMutation,
    updateTaskMutation,
  };
};
