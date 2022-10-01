import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.page.html',
  styleUrls: ['./create-new-task.page.scss'],
})
export class CreateNewTaskPage implements OnInit {
  newTask: Task = {
    title: '',
    description: '',
    id: '',
    category: '',
    priority: 'low',
    dueDate: '',
    remender: false,
    state: 'current'
  };
  categories = [
    'Work',
    'Personal',
  ];
  selectedCategory = '';
  constructor(public modalCtlr: ModalController, private data: DataService) { }
  selectCategory(i) {
    this.selectedCategory = this.categories[i];
  }
  ngOnInit() {
  }
  async add() {

    if (this.newTask.title === '') {
      return console.log('empty task');
    }
    this.newTask.id = this.newTask.title + this.newTask.dueDate;
    await this.data.addTask(this.newTask);


    this.dismis();
  }
  async dismis() {
    await this.modalCtlr.dismiss(this.newTask);
  }
}
