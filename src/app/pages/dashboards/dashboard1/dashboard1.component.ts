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
import { Router, RouterModule } from '@angular/router';
import { dashboardService } from '../dashboard.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ViewImageComponent } from '../common/view-image/view-image.component';

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
    RouterModule,
    MatDialogModule,
    OverlayModule,
    MatPaginatorModule,
  ],  
  templateUrl: './dashboard1.component.html',
  styleUrl: './dashboard1.component.scss'
})
export class AppDashboard1Component {

  protected listBaoCaoGanNhat :any[] = [];

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
  protected pageSizeOptionsApply: any[] = [];
  // protected totalRecordApply$!: Observable<number | null>;
  protected pageIndexApply!: number;
  protected pageSizeApply!: number;
  protected filterApply: any = {}
  protected totalRecordApply: number = 0
  
  protected allBaoCao$!: Observable<any>;
  private subscription!: Subscription;
  public loadingSpinner = false;
  // public dialog: MatDialog
  
  constructor( 
    private service: dashboardService, 
    private dialog: MatDialog, 
    private router: Router, 
  ) {}
  ngOnInit(): void {
    this.loadingSpinner = true
    this.pageSizeOptionsApply = [5, 10, 20, 50, 100, 200]
    this.pageIndexApply = 0
    this.pageSizeApply = 5
    this.filterApply = {
      page: this.pageIndexApply + 1,
      size: this.pageSizeApply,
      search: ''
    }
    this.allBaoCao$ = this.service.allBaoCao$
    
    this.subscription = this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {      
      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount      
      setTimeout(() => {
        this.loadingSpinner = false
      },500)
    });
  }

  viewImage(image: any) {
    const dialogRef = this.dialog.open(ViewImageComponent, {
      width: '80%',
      height: '80%',
      data: { image: image }
    });
  }
  chaneLinkViewImage(image: any) {
    window.open(image, "_blank")
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editBaoCao(event: Event,item: any) {
    event.stopPropagation();    
    this.router.navigate([`/dashboards/adhoc-report/${item._id}`]);    
  }

  deleteBaoCao(event: Event,id: any) {
    event.stopPropagation();    
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '290px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data:{
        title: 'Xoá báo cáo',
        message: 'Bạn có chắc muốn xoá báo cáo này ?',
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {      
      if (result) {        
        this.service.deleteDataBaoCao(id).subscribe(data => {
          this.loadingSpinner = true
          if (data) {
            this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
              this.listBaoCaoGanNhat = data.data;
              this.totalRecordApply = data.pagination.totalCount
              setTimeout(() => {
                this.loadingSpinner = false
              },1000)
            })
          }
        })
      } else {
        console.log('User clicked Cancel');
      }
    });
  }

  handlePageEventApply(e: PageEvent) {  
    // this.loadingSpinner = true;
    this.pageIndexApply = e.pageIndex
    this.pageSizeApply = e.pageSize
    this.filterApply = {
      page: this.pageIndexApply + 1,
      size: this.pageSizeApply,
      search: ''
    }
    this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount
    })
  }
  applyFilterApply(filterValue: string) {
    this.filterApply.search = filterValue  
    this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount
    })
    this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount
    })
  }

  onInput(event: Event, i:number, label: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || null;    
    // this.dataSanPham[i][label] = value;
  }
  exportToExcelBaoCaoGanNhat(): void {
    console.log(this.listBaoCaoGanNhat)
    let formattedData:any = []
    this.listBaoCaoGanNhat.forEach((element: any, index: number)=> {
      // console.log('element', element)
      console.log('index', index)
      element.chi_tiet.forEach((detail: any, index: number) => {
        // console.log('detail', detail)
        formattedData.push({
          "Ngày tạo": index == 0 ? element.createdAt : '',
          "Tên công trình": index == 0 ? element.name_cong_trinh : '',
          "Tên địa điểm": index == 0 ? element.name_dia_diem : '',
          "Tên dự án": index == 0 ? element.du_an : '',
          "Tên vật liệu": detail["Vật liệu"],
          "Số lượng": detail["Số lượng nhập"],
          "Đơn Giá": detail["Đơn giá"],
          "Mô tả hư hại": detail["Mô tả hư hại"],
          "Hình ảnh hư hại": detail["Hình ảnh hư hại"],
        })
        
      })
    })
    console.log('formattedData', formattedData)
    // 1. Tạo worksheet từ dữ liệu
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

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
