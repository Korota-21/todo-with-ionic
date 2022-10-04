import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Task } from '../interfaces/Task';
import { CreateNewTaskPage } from '../create-new-task/create-new-task.page';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  task: Task;
  taskChildren: Task[] = [];
  subscribtion!: Subscription;

  constructor(private data: DataService, private modalCtlr: ModalController,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTaskAndItsChildren();
  }
  async getTaskAndItsChildren() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.task = await this.data.getTaskId(id);
    this.setTaskSubscriotion(id);
  }

  async addChildTask(currentTask: Task) {
    const modal = await this.modalCtlr.create({
      component: CreateNewTaskPage,
      componentProps: { parentTask: currentTask }
    });

    modal.onDidDismiss().then(() => {
      this.data.getTasksFromStorage();
    });

    return await modal.present();
  }

  setTaskSubscriotion(id: string) {
    this.subscribtion = this.data.tasksChange.subscribe((tasks: Array<Task>) => {
      this.taskChildren = this.data.tasks.filter(task => task.parentTaskId === id);
    }
    );
  }
}
