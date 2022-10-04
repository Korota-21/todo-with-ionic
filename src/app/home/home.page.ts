import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Task } from '../interfaces/Task';
import { CreateNewTaskPage } from '../create-new-task/create-new-task.page';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  today: Date;
  taskList: Task[] = [];
  subscribtion!: Subscription;

  constructor(private data: DataService, public modalCtlr: ModalController, private router: Router) {
    this.today = new Date();
    this.setTaskSubscriotion();
  }


  refresh(event) {
    event.target.complete();
    this.router.navigate([this.router.url]);
  }

  async addNewTask() {
    const modal = await this.modalCtlr.create({
      component: CreateNewTaskPage,
    });
    modal.onDidDismiss().then(newTask => {
      this.data.getTasksFromStorage();
    });
    return await modal.present();
  }


  setTaskSubscriotion() {
    this.subscribtion = this.data.tasksChange.subscribe((tasks: Array<Task>) => {
      this.taskList = this.data.tasks;
    }
    );
  }
  getTasksList(filter: 'done' | 'all' | 'noChildren'): Task[]{
    if (filter === 'noChildren') {
      return this.taskList.filter(task => {
        if ((task.parentTaskId === null) && (task.state !== 'done')) {
          return task;
        }
      });
    }
    else if (filter === 'all') {
      return this.taskList;
    }else if (filter === 'done') {
      return this.taskList.filter(task => {
        if ((task.parentTaskId === null) && (task.state === 'done')) {
          return task;
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
