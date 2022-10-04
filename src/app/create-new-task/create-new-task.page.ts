import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Categories, Task } from '../interfaces/Task';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.page.html',
  styleUrls: ['./create-new-task.page.scss'],
})
export class CreateNewTaskPage implements OnInit {
  @Input() parentTask: Task;
  newTask: Task = {
    parentTaskId: null,
    title: '',
    description: '',
    id: '',
    category: Categories.personal,
    priority: 'low',
    dueDate: '',
    remender: false,
    state: 'current'
  };
  categories = [];
  selectedCategory = '';
  constructor(public modalCtlr: ModalController, private data: DataService) {
  }

  ngOnInit() {
    this.setCategories();
  }
  setCategories() {
    if (this.parentTask) {
      return this.selectedCategory = this.parentTask.category;
    }
    // eslint-disable-next-line guard-for-in
    for (const category in Categories) {
      this.categories.push(category);
    }
  }
  async add() {
    if (this.newTask.title === '') {
      return console.log('empty task');
    }
    if (this.parentTask != null) {
      this.newTask.parentTaskId = this.parentTask.id;
    }
    this.newTask.category = this.selectedCategory as Categories;
    this.newTask.id = 'task_' + new Date();
    await this.data.addTask(this.newTask);
    this.dismis();
  }
  async dismis() {
    await this.modalCtlr.dismiss(this.newTask);
  }
  selectCategory(i) {
    this.selectedCategory = this.categories[i];
  }
}
