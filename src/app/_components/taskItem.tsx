"use client";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type Task } from "~/server/db/schema";
import type { Identifier, XYCoord } from "dnd-core";

interface TaskProps {
  index: number;
  task: Task;
  isCompleted: boolean;
  onToggleComplete: (taskId: number, currentValue: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  dropTask: (dragIndex: number, hoverIndex: number) => void;
}

export default function TaskItem({
  index,
  task,
  isCompleted,
  onToggleComplete,
  onEdit,
  onDelete,
  moveTask,
  dropTask,
}: TaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    TaskProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: (item: { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      dropTask(dragIndex, hoverIndex);
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => {
      return { index, task };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      key={task.id}
      className="relative flex items-center py-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-handler-id={handlerId}
    >
      <div className="ml-3 mr-3 flex items-center">
        <input
          id={`task-${task.id}`}
          name={`task-${task.id}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          onChange={() => onToggleComplete(task.id, isCompleted)}
          checked={isCompleted}
        />
      </div>
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label
          htmlFor={`task-${task.id}`}
          className="select-none font-medium text-gray-900"
        >
          {task.task}
        </label>
      </div>
      <div>{isCompleted && <p className="self-start text-sm">Validée</p>}</div>
      <div className="ml-3 mr-3 flex items-center gap-2">
        <span
          onClick={() => onEdit(task)}
          className="inline-block cursor-pointer rounded-full bg-gradient-to-r from-primary to-accent p-1.5 shadow-md hover:animate-bigger hover:from-accent hover:to-accentGradient"
        >
          <PencilIcon className="h-5 w-5 text-white" />
        </span>
        <span
          onClick={() => onDelete(task)}
          className="inline-block cursor-pointer rounded-full bg-gradient-to-r from-warning to-warningGradient p-1.5 shadow-md hover:animate-bigger hover:from-warningGradient hover:to-warningGradient"
        >
          <TrashIcon className="h-5 w-5 text-white" />
        </span>
      </div>
    </div>
  );
}
