import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardsRoutes } from './dashboards.routes';
import { AdhocReportComponent } from './adhoc-report/adhoc-report.component';
import { LocationComponent } from './location/location.component';
import { ProjectComponent } from './project/project.component';
import { ProductComponent } from './product/product.component';
import { dashboardService } from './dashboard.service';
import { S3Client } from '@aws-sdk/client-s3';

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
  providers: [
    dashboardService,
    // {
    //   provide: S3Client,
    //   useFactory: () => new S3Client({
    //     region: 'us-east-1', // MinIO không yêu cầu region
    //     endpoint: 'http://khoadue.me:9001', // URL của MinIO
    //     credentials: {
    //       accessKeyId: 'nltbO2VxDjerDd3YhxwI', // Thay thế với AccessKey của bạn
    //       secretAccessKey: 'FRmNitQwocCBwLxqlqaUp5qC3gQM8XSHi0AouDsc', // Thay thế với SecretKey của bạn
    //     },
    //     forcePathStyle: true, // Bắt buộc với MinIO
    //   }),
    // }
  ],
  declarations: [AdhocReportComponent],
})
export class DashboardsModule {}
