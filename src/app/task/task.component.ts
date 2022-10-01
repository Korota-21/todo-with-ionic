import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private data: DataService,public modalCtlr: ModalController) { }

  ngOnInit() { }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
  async updateTask(selectedTask: Task){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    });

    modal.onDidDismiss().then(()=>{
      this.data.getTasksFromStorage();
    });

    return await modal.present();
  }
  deleteTask(key: string) {
    this.data.deleteTask(key);
  }
}
