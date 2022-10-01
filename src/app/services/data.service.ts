/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  remender: boolean;
  category: string;
  priority: 'low' | 'high' | 'normal';
  state: 'done' | 'current' | 'late';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks: Task[] = [];
  public tasksChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();
    this.getTasksFromStorage();
  }
  getTasksFromStorage() {
    const tasks: any = [];
    this.storage.forEach((value) => {
      tasks.push(value);
    });
    this.tasksChange.next(tasks);
  }
  public addTask(task: Task): Task {
    this._storage?.set(task.id, task);
    this.getTasksFromStorage();
    return task;
  }
  public async getTaskId(id: string): Promise<Task> {
    return await this._storage.get(id);
  }

  public deleteTask(id: string) {
    this._storage?.remove(id);
    this.getTasksFromStorage();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
