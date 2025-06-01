import { Routes } from '@angular/router';
import { AppTechnicalSupportComponent } from './technical-support.component';

// theme pages
// import { AppLandingpageComponent } from './landingpage.component';

export const TechnicalSupportRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppTechnicalSupportComponent,
      },
    ],
  },
];
