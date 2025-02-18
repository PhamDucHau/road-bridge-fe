import { Component, TemplateRef } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import * as ExcelJS from 'exceljs';

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
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ViewImageComponent } from '../common/view-image/view-image.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarFormDialogComponent } from '../common/calendar-form-dialog/calendar-form-dialog.component';

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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard1.component.html',
  styleUrl: './dashboard1.component.scss'
})
export class AppDashboard1Component {
  dialogRef2: MatDialogRef<CalendarFormDialogComponent> =
    Object.create(TemplateRef);

  protected listBaoCaoGanNhat: any[] = [];

 
  protected pageSizeOptionsApply: any[] = [];
  // protected totalRecordApply$!: Observable<number | null>;
  protected pageIndexApply!: number;
  protected pageSizeApply!: number;
  protected filterApply: any = {}
  protected totalRecordApply: number = 0

  protected allBaoCao$!: Observable<any>;
  private subscription!: Subscription;
  public loadingSpinner = false;
  protected congTrinhControl = new FormControl('');
  protected isFilterTime = false;
  protected isFilterQuy = false;
  // public dialog: MatDialog

  constructor(
    private service: dashboardService,
    private dialog: MatDialog,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.isFilterTime = false
    this.isFilterQuy = false
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
      }, 500)
    });
  }

  filterQuy(): void {
    this.isFilterTime = false
    this.isFilterQuy = false
    this.dialogRef2 = this.dialog.open(CalendarFormDialogComponent, {
      panelClass: 'calendar-form-dialog',
      data: {
        action: 'filterQuy',
        date: new Date(),
      },
    });
    this.dialogRef2.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      this.filterApply = {
        page: this.pageIndexApply + 1,
        size: this.pageSizeApply,
        search: ''
      }
      this.filterApply = {
        year: res.event.year,
        quarter: res.event.quy,
        ...this.filterApply,

      };

      this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
        this.isFilterQuy = true
        this.listBaoCaoGanNhat = data.data;
        this.totalRecordApply = data.pagination.totalCount
        setTimeout(() => {
          this.loadingSpinner = false
        }, 500)
      });

    });
  }
  filterKhoanThoiGian(): void {
    this.isFilterTime = false
    this.isFilterQuy = false

    this.dialogRef2 = this.dialog.open(CalendarFormDialogComponent, {
      panelClass: 'calendar-form-dialog',
      data: {
        action: 'filterTime',
        date: new Date(),
      },
    });
    this.dialogRef2.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      this.filterApply = {
        page: this.pageIndexApply + 1,
        size: this.pageSizeApply,
        search: ''
      }
      this.filterApply = {
        startDate: res.event.start.toISOString().split("T")[0],
        endDate: res.event.end.toISOString().split("T")[0],
        ...this.filterApply,
      };

      this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
        this.isFilterTime = true
        this.listBaoCaoGanNhat = data.data;
        this.totalRecordApply = data.pagination.totalCount

        setTimeout(() => {
          this.loadingSpinner = false
        }, 500)
      });

    });
  }

  resetFilter() {
    this.isFilterTime = false
    this.isFilterQuy = false
    this.filterApply = {
      page: this.pageIndexApply + 1,
      size: this.pageSizeApply,
      search: ''
    }
    this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {

      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount

      setTimeout(() => {
        this.loadingSpinner = false
      }, 500)
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

  upDoneBaoCao(event: Event, id: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '290px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data: {
        title: 'Chuyển thành DONE',
        message: 'Bạn có chắc muốn thực hiện hành động này ?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.changeStatusBaoCao(id).subscribe(data => {
          this.loadingSpinner = true
          if (data) {
            this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
              this.listBaoCaoGanNhat = data.data;
              this.totalRecordApply = data.pagination.totalCount
              setTimeout(() => {
                this.loadingSpinner = false
              }, 1000)
            })
          }
        })
      } else {
        console.log('User clicked Cancel');
      }
    });
  }

  editBaoCao(event: Event, item: any) {
    event.stopPropagation();
    this.router.navigate([`/dashboards/adhoc-report/${item._id}`]);
  }

  deleteBaoCao(event: Event, id: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '290px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data: {
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
              }, 1000)
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
    this.filterApply = {
      page: this.pageIndexApply + 1,
      size: this.pageSizeApply,
      search: ''
    }
    this.filterApply.search = filterValue
    this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
      this.listBaoCaoGanNhat = data.data;
      this.totalRecordApply = data.pagination.totalCount
    })
    // this.service.getAllDataBaoCao(this.filterApply).subscribe(data => {
    //   this.listBaoCaoGanNhat = data.data;
    //   this.totalRecordApply = data.pagination.totalCount
    // })
  }

  onInput(event: Event, i: number, label: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || null;
    // this.dataSanPham[i][label] = value;
  }
 

  exportExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    // Merge ô theo cấu trúc của file mẫu
  
  
    // Thêm dữ liệu vào sheet
    const data = [
      [''],
      [''],
      [''],
      [''],
      ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Lý trình', '', 'Số lượng báo hiệu', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', 'Bờ trái', 'Bờ phải', 'Trên bờ', 'Dưới nước'],
      [''],
      ['', '', '', '', 'Bê\ntông', 'D219,\nL=12m', 'D219,\nL=1m', 'D90,\nL=3,2m', 'D113,5,\nL=6m', 'D113,5,\nL=4m', 'D126,8,\nL=5,5m', 'D141,3,\nL=6,5m',
         'D168,3,\nL=7,5m', '1,2m\nx\n2,4m', '1m\nx\n2m', '0,8m\nx\n1,7m', '0,7m\nx\n1,4m', '1,8m\nx\n1,8m', '1,5m\nx\n1,5m', '1,2m\nx\n1,2m', '1,2m\nx\n0,7m',
         '1,2m\nx\n0,8m', '1,2m\nx\n0,4m', '12m', '18m', 'BH phụ\n(0,4m\nx\n0,3m)', 'D1200', 'D2000', 'Xích', '1,2m\nx\n1,2m', '0,6m\nx\n0,6m', 'Thước\nnước\nngược', 
         'Bảng\ntên\ncầu', 'BH\nphụ\n(0,4m\nx\n0,3m)', 'Cột', 'TĐ\n12m', 'TĐ\n18m', 'Phao', 'Trên\ncầu']
    ];

    
  
    data.forEach((row, index) => {
      sheet.addRow(row);
    });
    sheet.mergeCells('A1:AM1');
    sheet.mergeCells('A2:AM2');
    sheet.mergeCells('A3:AM3');
    sheet.mergeCells('A4:AM4');

    sheet.mergeCells('A5:A8');
    sheet.mergeCells('B5:B8');
    sheet.mergeCells('C5:D5');
    sheet.mergeCells('E5:AH5');
    sheet.mergeCells('E6:Z6');
    sheet.mergeCells('C6:C8');
    sheet.mergeCells('D6:D8');
    sheet.mergeCells('AA6:AC6');
    sheet.mergeCells('AD6:AH6');
    sheet.mergeCells('E7:G7');
    sheet.mergeCells('H7:M7');
    sheet.mergeCells('N7:W7');
    sheet.mergeCells('X7:Z7');
    sheet.mergeCells('AA7:AC7');
    sheet.mergeCells('AD7:AF7');
    sheet.mergeCells('AG7:AG8');
    sheet.mergeCells('AH7:AH8');
    sheet.mergeCells('AI5:AM5');
    sheet.mergeCells('AI6:AK6');
    sheet.mergeCells('AI7:AI8');
    sheet.mergeCells('AJ7:AJ8');
    sheet.mergeCells('AK7:AK8');
    sheet.mergeCells('AL6:AL8');
    sheet.mergeCells('AM6:AM8');

    ['A1', 'A2', 'A3', 'A4'].forEach((cell) => {
      sheet.getCell(cell).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    

    sheet.getCell('A1').value = 'BẢNG TỔNG HỢP HỆ THỐNG BÁO HIỆU ĐƯỜNG THỦY NỘI ĐỊA';
    sheet.getCell('A2').value = 'CÔNG TRÌNH: BẢO TRÌ CÔNG TRÌNH ĐƯỜNG THUỶ NỘI ĐỊA NĂM 2024';
    sheet.getCell('A3').value = 'GÓI THẦU: BẢO TRÌ CÔNG TRÌNH ĐƯỜNG THUỶ NỘI ĐỊA KHU VỰC 1';
    sheet.getCell('A4').value = 'ĐỊA ĐIỂM: KHU VỰC QUẬN, HUYỆN, THÀNH PHỐ HỒ CHÍ MINH';

    
    sheet.getCell('A5').value = 'Stt';
    sheet.getCell('AA6').value = 'Dưới nước';
    sheet.getCell('AD6').value = 'Trên cầu';
    sheet.getCell('E7').value = 'Móng';
    sheet.getCell('H7').value = 'Cột';
    sheet.getCell('N7').value = 'Bảng';
    sheet.getCell('X7').value = 'Trụ đèn';
    sheet.getCell('AA7').value = 'Phao';
    sheet.getCell('AD7').value = 'Báo hiệu';
    sheet.getCell('AG7').value = 'Bảng\ntên\ncầu';  
    sheet.getCell('AI5').value = 'ĐÈN BÁO HIỆU'; 
    sheet.getCell('AI6').value = 'Trên bờ'; 
    sheet.getCell('AI7').value = 'Cột';
    sheet.getCell('AJ7').value = 'TĐ\n12m';
    sheet.getCell('AK7').value = 'TĐ\n18m';
    sheet.getCell('AL6').value = 'Phao';
    sheet.getCell('AM6').value = 'Trên\ncầu';
    // sheet.getCell('AG3').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };  
    sheet.getCell('AH7').value = 'BH phụ (0,4m x 0,3m)';
    
    
    // Căn giữa các ô merge
    ['A5', 'B5', 'C5', 'E5', 'E6', 'AI5', 'AI6', 'AI7', 'C6', 'D6', 'AA6', 'AD6', 'E7', 'H7', 'N7', 'X7', 'AA7','AD7', 'AG7', 'AD7', 'AH7', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8', 'K8', 'L8', 'M8', 'N8', 'O8', 'P8', 'Q8', 'R8', 'S8', 'T8', 'U8', 'V8', 'W8', 'X8', 'Y8', 'Z8', 'AA8', 'AB8', 'AC8', 'AD8', 'AE8', 'AF8', 'AG8', 'AH8', 'AI8', 'AJ8', 'AK8', 'AL8', 'AM8'].forEach((cell) => {
      sheet.getCell(cell).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
      sheet.getCell(cell).font = { bold: true };
    });

    sheet.getCell('A1').alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
    sheet.getCell('A1').font = { bold: true, size: 16 };

    ['A2', 'A3', 'A4'].forEach((cell) => {
      sheet.getCell(cell).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
      sheet.getCell(cell).font = { bold: true, size: 12 };
    });


    this.service.getAllBaoCao().subscribe(data => {
      const result = this.aggregateMaterials(data);      
      const dataRes = JSON.parse(result);      

      const listVL:any = {
        "Bê tông": 'E',
        "D219, L=12m": 'F',
        "D219, L=1m": 'G',
        'D90, L=3,2m': 'H',
        'D113,5, L=6m':  'I',
        'D113,5, L=4m': 'J',
        'D126,8, L=5,5m': 'K',
        'D141,3, L=6,5m': 'L',
        'D168,3, L=7,5m': 'M',
        '1,2m x 2,4m': 'N',
        '1m x 2m': 'O',
        '0,8m x 1,7m': 'P',
        '0,7m x 1,4m': 'Q',
        '1,8m x 1,8m': 'R',
        '1,5m x 1,5m': 'S',
        '1,2m x 1,2m': 'T',
        '1,2m x 0,7m': 'U',
        '1,2m x 0,8m': 'V',
        '1,2m x 0,4m': 'W',
        '12m': 'X',
        '18m': 'Y',
        'BH phụ (0,4m x 0,3m)': 'Z',
        'D1200': 'AA',
        'D2000': 'AB',
        'Xích': 'AC',
        '1,2m x 1,2m!': 'AD',
        '0,6m x 0,6m': 'AE',
        'Thước nước ngược': 'AF',
        'Bảng tên cầu': 'AG',
        'BH phụ (0,4m x 0,3m)!': 'AH',
        'Cột': 'AI',
        'TĐ 12m': 'AJ',
        'TĐ 18m': 'AK',
        'Phao': 'AL',
        'Trên cầu': 'AM'
      }
      
      dataRes.forEach((item: any, index: number) => {
        let count = 9
        sheet.getCell(`A${index + count}` ).value = index + 1;
        sheet.getCell(`B${index + count}` ).value = item.name_cong_trinh;
        sheet.getCell(`A${index + count}`).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
        sheet.getCell(`A${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
        sheet.getCell(`B${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
       
        item.chi_tiet.forEach((detail: any, index2: number) => {
          
          if(detail['Số lượng nhập']){
            const materialKey = detail['Vật liệu'];
            const vl = listVL[materialKey];
           
            if(vl){              
              sheet.getCell(`${vl}${index + count}` ).value = detail['Số lượng nhập']
              sheet.getCell(`${vl}${index + count}`).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
              sheet.getCell(`${vl}${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
            }
            
          }else{
            const materialKey = detail['Vật liệu'];
            const vl = listVL[materialKey];
            
            if(vl){              
              sheet.getCell(`${vl}${index + count}` ).value = '-'
              sheet.getCell(`${vl}${index + count}`).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
              sheet.getCell(`${vl}${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
            }
          }
        })
      });
      const columnWidths = [
        10, 50, 15, 15
      ];
      columnWidths.forEach((width, index) => {
        sheet.getColumn(index + 1).width = width;
      });
      sheet.getRow(8).height = 50;
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'export.xlsx');
      });
    });   
    
  }

  aggregateMaterials(data:any) {
    const result:any = [];
  
    data.forEach((item:any) => {
      const { name_cong_trinh, chi_tiet } = item;
      chi_tiet.forEach((detail:any) => {
        const materialName = detail["Vật liệu"];
        const quantity = parseInt(detail["Số lượng nhập"]) || 0;
  
        let existingProject = result.find((r:any) => r.name_cong_trinh === name_cong_trinh);
        if (!existingProject) {
          existingProject = {
            name_cong_trinh,
            chi_tiet: []
          };
          result.push(existingProject);
        }
  
        let existingMaterial = existingProject.chi_tiet.find((m:any) => m["Vật liệu"] === materialName);
        if (existingMaterial) {
          existingMaterial["Số lượng nhập"] += quantity;
        } else {
          existingProject.chi_tiet.push({ "Vật liệu": materialName, "Số lượng nhập": quantity });
        }
      });
    });
  
    return JSON.stringify(result, null, 2);
  }
  

  


}
