import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';





import { User } from './user.routes';




@NgModule({
  imports: [
    RouterModule.forChild(User),
   
    
  ],
})
export class UserModule {}
