import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseContentDetailsComponent } from './components/coures-content-details/coures-content-details.component';




export const DashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/Dashboard' },
            // { title: 'Chat' },
          ],
        },
      },
      {
        path: 'course-content-detail/:id',
        component: CourseContentDetailsComponent,
        data: {
          title: 'Course Content Detail',
          urls: [
            { title: 'Course', url: `/dashboard` },
            { title: 'Course Content Detail' },
          ],
        },
      },
      {
        path: ':id',
        component: CourseDetailComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Course Detail' },
          ],
        },
      },

    ]
    
  },
 
];
