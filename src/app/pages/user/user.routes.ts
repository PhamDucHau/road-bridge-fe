import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

// dashboards
// import { AppDashboard1Component } from './dashboard1/dashboard1.component';


export const User: Routes = [
  {
    path: '',
    title: 'User',
    
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'User',
          urls: [
            { title: 'Use' },
            
          ],
        },
        
      },
    ],
    
   
  },
];
