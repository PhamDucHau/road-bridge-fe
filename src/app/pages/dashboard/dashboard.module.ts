import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.router';




@NgModule({
  imports: [
    RouterModule.forChild(DashboardRoutes),
   
  ],
})
export class DashboardModule {}
