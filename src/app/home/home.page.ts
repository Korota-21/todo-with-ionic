import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Task } from '../interfaces/Task';
import { CreateNewTaskPage } from '../create-new-task/create-new-task.page';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  today: Date;
  taskList: Task[]=[];
  subscribtion!: Subscription;

  constructor(private data: DataService, public modalCtlr: ModalController) {
    this.today = new Date();
    this.setTaskSubscriotion();
  }


  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
      console.log('refresh');
    }, 3000);
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
      this.taskList = this.data.tasks.filter(task=>task.parentTaskId ==null);
    }
    );
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
