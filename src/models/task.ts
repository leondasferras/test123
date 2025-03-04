import { makeAutoObservable } from "mobx";
import taskStore from "../stores/tasks.store";

export class TaskModel {
  id: string;
  title: string;
  isDone: boolean;
  subTasks: TaskModel[];
  parent: TaskModel | null;

  constructor(title: string, id: string, parent: TaskModel | null = null) {
    this.id = id;
    this.title = title;
    this.isDone = false;
    this.subTasks = [];
    this.parent = parent;
    makeAutoObservable(this);
  }

  addNewTask(id: string, title: string) {
    const newTask = new TaskModel(id, title, this);
    this.subTasks.push(newTask);
  }

  deleteTask(id: string) {
    if (this.parent !== null)
      this.parent.subTasks = this.parent.subTasks.filter(
        (task) => task.id !== id
      );
    else taskStore.tasks = taskStore.tasks.filter((task) => task.id !== id);
  }

  toggleIsDone() {
    const newState = !this.isDone;
    this.isDone = !this.isDone;
    this.subTasks.forEach((subTask) => subTask.setIsDone(newState));
    if (this.parent) this.parent.updateParent();
  }

  setIsDone(isDone: boolean) {
    this.isDone = isDone;
    this.subTasks.forEach((subTask) => subTask.setIsDone(isDone));
  }

  checkIfAllSubTasksCompleted() {
    return this.subTasks.every((subTask) => subTask.isDone);
  }

  updateParent() {
    if (this.checkIfAllSubTasksCompleted()) {
      this.isDone = true;
    } else {
      this.isDone = false;
    }
    if (this.parent) {
      this.parent.updateParent();
    }
  }
}
