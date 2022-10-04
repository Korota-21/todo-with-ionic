import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Categories, Task } from '../interfaces/Task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task: Task;
  categories = [];
  selectedCategory = '';
  constructor(public modalCtlr: ModalController, private data: DataService) { }

  ngOnInit() {
    this.setCategories();
    this.selectedCategory = this.task.category;
  }

  setCategories() {
    // eslint-disable-next-line guard-for-in
    for (const category in Categories) {
      this.categories.push(category);
    }
  }
  async update() {
    if (this.task.title === '') {
      return console.log('cannot be empty');
    }
    this.task.category = this.selectedCategory as Categories;
    await this.data.addTask(this.task);
    this.dismis();
  }
  async dismis() {
    await this.modalCtlr.dismiss(this.task);
  }
  selectCategory(i) {
    this.selectedCategory = this.categories[i];
  }
}
