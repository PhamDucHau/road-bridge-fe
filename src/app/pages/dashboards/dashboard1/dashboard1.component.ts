import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// components
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    TablerIconsModule,
    AppTopCardsComponent,
    AppRevenueUpdatesComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppEmployeeSalaryComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppSocialCardComponent,
    AppSellingProductComponent,
    AppWeeklyStatsComponent,
    AppTopProjectsComponent,
    AppProjectsComponent,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component {
  protected listBaoCaoGanNhat :any[] = [
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Láng The - Bến mương',
      status: 'WIP',
      userHandle: 'Phuc Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC định ngạch',
      description: 'Kênh Thầy Cai',
      status: 'DONE',
      userHandle: 'Phuc Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Kênh Địa Phận',
      status: 'WIP',
      userHandle: 'Phuc Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    }
  ];
  protected listBaoCaoDotXuat :any[] = [
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Láng The - Bến mương',
      status: 'WIP',
      userHandle: 'Phuc Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Tra',
      status: 'DONE',
      userHandle: 'Thinh Vo',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Láng The - Bến mương',
      status: 'WIP',
      userHandle: 'Trang Tran',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Láng The - Bến mương',
      status: 'WIP',
      userHandle: 'Phuc Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    },
    {
      time: '10/5/2024',
      title: 'BC đột xuất',
      description: 'Rạch Láng The - Bến mương',
      status: 'WIP',
      userHandle: 'Huy Nguyen',
      data: [
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
        {
          product: 'Biển báo',
          price: 100.000,
          quantity: 20,
          note: 'Chính xác',
          images: 'assets/images/products/s1.jpg',
        },
      ]
    }
  ];
  constructor( private service: dashboardService ) {}
  exportToExcelBaoCaoGanNhat(): void {
    // 1. Tạo worksheet từ dữ liệu
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listBaoCaoGanNhat);

    // 2. Tạo workbook và thêm worksheet vào
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 3. Xuất file Excel dưới dạng Blob
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    // 4. Lưu file bằng file-saver
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'BaoCaoGanNhat.xlsx');
  }
  exportToExcelBaoCaoDotXuat(): void {
    // 1. Tạo worksheet từ dữ liệu
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listBaoCaoDotXuat);

    // 2. Tạo workbook và thêm worksheet vào
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 3. Xuất file Excel dưới dạng Blob
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    // 4. Lưu file bằng file-saver
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'BaoCaoDotXuat.xlsx');
  }

  
}
