import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },

  {
    path:'about', component:AboutComponent
  },

  {
    path:'new/moment', component:NewMomentComponent
  },

  { path:'moment/:id', component:MomentComponent },
  
  {
    path:'moment/edit/:id', component:EditMomentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
