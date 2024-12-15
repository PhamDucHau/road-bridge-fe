import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';





import { Home } from './home.routes';




@NgModule({
  imports: [
    RouterModule.forChild(Home),
   
    
  ],
})
export class HomeModule {}
