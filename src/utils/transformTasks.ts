import { TaskModel } from "../models/task";
import { TTask } from "../types/task";

export const transformTasks = (tasks: TTask[], parent: TaskModel | null = null): TaskModel[] => {

  if (!tasks) {
    return [];
  }

  return tasks.map((task) => {
    const newTask = new TaskModel(task.title, task.id, parent);
    newTask.isDone = task.isDone;
    newTask.subTasks = transformTasks(task.subtasks, newTask);
    return newTask;
  });
};