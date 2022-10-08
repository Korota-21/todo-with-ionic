import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GestureController, IonContent, IonSegment, ModalController } from '@ionic/angular';
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
export class HomePage implements OnDestroy, OnInit {
  @ViewChild('content', { read: ElementRef, static: true }) content: ElementRef;
  @ViewChild('segment') segment: IonSegment;
  segmentTitles = ['default', 'all', 'done'];
  today: Date;
  taskList: Task[] = [];
  subscribtion!: Subscription;
  constructor(private data: DataService, public modalCtlr: ModalController, private router: Router
    , private gestureCtrl: GestureController) {
    this.today = new Date();
    this.setTaskSubscriotion();
  }
  ngOnInit(): void {
    const gesture = this.gestureCtrl.create({
      el: this.content.nativeElement,
      gesturePriority: 100,
      threshold: 5,
      passive: false,
      onEnd: (detail) => {
        let currentSeg = +this.segment.value;
        const moveDistance = detail.startX - detail.currentX;
        const reqDistanceToMove = 50;
        if (moveDistance < -reqDistanceToMove) {
          if (currentSeg > 0) {
            currentSeg--;
          }
        } else if (moveDistance > reqDistanceToMove) {
          if (currentSeg < this.segmentTitles.length - 1) {
            currentSeg++;
          }
        }
        this.segment.value = currentSeg.toString();
      },
      gestureName: 'test-gesture'
    });
    gesture.enable();
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
  getTasksList(filter: 'done' | 'all' | 'default'): Task[] {
    if (filter === 'default') {
      return this.taskList.filter(task => {
        if ((task.parentTaskId === null) && (task.state !== 'done')) {
          return task;
        }
      });
    }
    else if (filter === 'all') {
      return this.taskList;
    } else if (filter === 'done') {
      return this.taskList.filter(task => {
        if (task.state === 'done') {
          return task;
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
  private onEnd(detail) {

  }
}
