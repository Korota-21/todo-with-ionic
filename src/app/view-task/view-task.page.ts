import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {
  public task: Task;

  constructor( private data: DataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTask();
  }
  async getTask(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.task = await this.data.getTaskId(id);
  }
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

}
