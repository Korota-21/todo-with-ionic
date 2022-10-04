import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },

  {
    path: 'task/:id', component: ViewTaskComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'view-task', component: ViewTaskComponent
  },
  {
    path: 'create-new-task',
    loadChildren: () => import('./create-new-task/create-new-task.module').then(m => m.CreateNewTaskPageModule)
  },
  {
    path: 'update-task',
    loadChildren: () => import('./update-task/update-task.module').then(m => m.UpdateTaskPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
