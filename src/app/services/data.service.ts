/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/Task';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks: Task[] = [];
  public tasksChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();
  }

  async getTasksFromStorage() {
    const tasks: Array<Task> = [];
    await this.storage.forEach((value: Task) => {
      tasks.push(value);
    });
    this.tasks = tasks;
    this.tasksChange.next(tasks);
  }
  public addTask(task: Task): Task {
    this._storage?.set(task.id, task);
    return task;
  }
  public async getTaskId(id: string): Promise<Task> {
    try {
      return await this._storage.get(id);
    } catch (error) {
      await this.init();
      return await this._storage.get(id);
    }
  }

  public deleteTask(id: string) {

    this._storage?.remove(id);
    this.getTasksFromStorage();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.getTasksFromStorage();
  }
}
