import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardsRoutes } from './dashboards.routes';
import { AdhocReportComponent } from './adhoc-report/adhoc-report.component';
import { LocationComponent } from './location/location.component';
import { ProjectComponent } from './project/project.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardsRoutes),
    AppDashboard1Component,
    AppDashboard2Component,
    AdhocReportComponent,
    LocationComponent,
    ProjectComponent,
    ProductComponent

  ],
  declarations: [AdhocReportComponent],
})
export class DashboardsModule {}
