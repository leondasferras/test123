import { makeAutoObservable } from "mobx";
import { TaskModel } from "../models/task.ts";
import { transformTasks } from "../utils/transformTasks.ts";
import { mockTasks } from "../mockTasks.ts";

class TaskStore {
  tasks: TaskModel[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = transformTasks(mockTasks);
  }

  toggleTaskCompletion(task: TaskModel) {
    task.toggleIsDone();
  }
}

const taskStore = new TaskStore();
export default taskStore;
