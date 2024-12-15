import { Routes } from '@angular/router';

// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { AdhocReportComponent } from './adhoc-report/adhoc-report.component';
import { LocationComponent } from './location/location.component';
import { ProjectComponent } from './project/project.component';
import { ProductComponent } from './product/product.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: AppDashboard1Component,
        data: {
          title: 'Analytical',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Analytical' },
          ],
        },
      },
      {
        path: 'dashboard2',
        component: AppDashboard2Component,
        data: {
          title: 'eCommerce',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'eCommerce' },
          ],
        },
      },
      {
        path: 'adhoc-report',
        component: AdhocReportComponent,
        data: {
          title: 'Báo cáo đột xuất',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Báo cáo đột xuất' },
          ],
        },
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Sản phẩm',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Sản phẩm' },
          ],
        },
      },
      {
        path: 'project',
        component: ProjectComponent,
        data: {
          title: 'Công trình',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Công trình' },
          ],
        },
      },
      {
        path: 'location',
        component: LocationComponent,
        data: {
          title: 'Địa điểm',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Địa điểm' },
          ],
        },
      },
    ],
  },
];
