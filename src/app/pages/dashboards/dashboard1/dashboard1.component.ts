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

  protected listExportBcDinhNgach: any[] = [
    {
      value: "BDPQ",
      name: 'Bảo dưỡng phát quang',
    },
    {
      value: "VSDN",
      name: 'Vệ sinh đèn năng',
    },
    {
      value: "DCP",
      name: 'Điều chỉnh phao',
    },
    
    {
      value: "CBR",
      name: 'Chống bôi rửa',
    },
    {
      value: "SMPQ",
      name: 'Sơn màu phát quang',
    },
    {
      value: "HT",
      name: 'Hành trình',
    },
  ];
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
      search: '',      
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
  exportExcelFilter() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    // Merge ô theo cấu trúc của file mẫu
  
  
    // Thêm dữ liệu vào sheet
    const data = [
      [''],[''],[''],[''],
      ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Số lượng báo hiệu', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      // ['', '', 'Bờ trái', 'Bờ phải', 'Trên bờ', 'Dưới nước'],
      ['', '','Trên bờ', 'Dưới nước'],
      [''],
      ['', '', 'Bê\ntông', 'D219,\nL=12m', 'D219,\nL=1m', 'D90,\nL=3,2m', 'D113,5,\nL=6m', 'D113,5,\nL=4m', 'D126,8,\nL=5,5m', 'D141,3,\nL=6,5m',
         'D168,3,\nL=7,5m', '1,2m\nx\n2,4m', '1m\nx\n2m', '0,8m\nx\n1,7m', '0,7m\nx\n1,4m', '1,8m\nx\n1,8m', '1,5m\nx\n1,5m', '1,2m\nx\n1,2m', '1,2m\nx\n0,7m',
         '1,2m\nx\n0,8m', '1,2m\nx\n0,4m', '12m', '18m', 'BH phụ\n(0,4m\nx\n0,3m)', 'D1200', 'D2000', 'Xích', '1,2m\nx\n1,2m', '0,6m\nx\n0,6m', 'Thước\nnước\nngược', 
         'Bảng\ntên\ncầu', 'BH\nphụ\n(0,4m\nx\n0,3m)', 'Cột', 'TĐ\n12m', 'TĐ\n18m', 'Phao', 'Trên\ncầu']
    ];

    
  
    data.forEach((row, index) => {
      sheet.addRow(row);
    });
    sheet.mergeCells('A1:AL1');
    sheet.mergeCells('A2:AL2');
    sheet.mergeCells('A3:AL3');
    sheet.mergeCells('A4:AL4');

    sheet.mergeCells('A5:A8');
    sheet.mergeCells('B5:B8');
    // sheet.mergeCells('C5:D5'); → xoá
    // sheet.mergeCells('C6:C8'); → xoá
    // sheet.mergeCells('D6:D8'); → xoá
    sheet.mergeCells('C5:AF5');
    sheet.mergeCells('C6:X6');
    sheet.mergeCells('Y6:AA6');
    sheet.mergeCells('AB6:AF6');
    sheet.mergeCells('C7:E7');
    sheet.mergeCells('F7:K7');
    sheet.mergeCells('L7:T7');
    sheet.mergeCells('V7:X7');
    sheet.mergeCells('Y7:AA7');
    sheet.mergeCells('AB7:AD7');
    sheet.mergeCells('AE7:AE8');
    sheet.mergeCells('AF7:AF8');
    sheet.mergeCells('AG5:AK5');
    sheet.mergeCells('AG6:AI6');
    sheet.mergeCells('AG7:AG8');
    sheet.mergeCells('AH7:AH8');
    sheet.mergeCells('AI7:AI8');
    sheet.mergeCells('AJ6:AJ8');
    sheet.mergeCells('AK6:AK8');

    sheet.mergeCells('AL5:AL8');
    

 

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
    sheet.getCell('AE7').value = 'Bảng\ntên\ncầu';  
    sheet.getCell('AF7').value = 'BH phụ (0,4m x 0,3m)';
    sheet.getCell('AG5').value = 'ĐÈN BÁO HIỆU'; 
    sheet.getCell('AH6').value = 'Trên bờ'; 
    sheet.getCell('AG7').value = 'Cột';
    sheet.getCell('AH7').value = 'TĐ\n12m';
    sheet.getCell('AI7').value = 'TĐ\n18m';
    sheet.getCell('AJ6').value = 'Phao';
    sheet.getCell('AK6').value = 'Trên\ncầu';

    sheet.getCell('AL5').value = 'Hành\ntrình';
    // sheet.getCell('AG3').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    
    
    // Căn giữa các ô merge
    ['A5', 'B5', 'C5', 'E5', 'E6', 'AI5', 'AI6', 'AI7', 'C6', 'D6', 'AA6', 'AD6', 'E7', 'H7', 'N7', 'X7', 'AA7','AD7', 'AG7', 'AD7', 'AH7','C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8', 'K8', 'L8', 'M8', 'N8', 'O8', 'P8', 'Q8', 'R8', 'S8', 'T8', 'U8', 'V8', 'W8', 'X8', 'Y8', 'Z8', 'AA8', 'AB8', 'AC8', 'AD8', 'AE8', 'AF8', 'AG8', 'AH8', 'AI8', 'AJ8', 'AK8', 'AL8', 'AM8'].forEach((cell) => {
      sheet.getCell(cell).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
      sheet.getCell(cell).font = { bold: true };
    });

    sheet.getCell('A1').alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
    sheet.getCell('A1').font = { bold: true, size: 16 };

    ['A2', 'A3', 'A4'].forEach((cell) => {
      sheet.getCell(cell).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
      sheet.getCell(cell).font = { bold: true, size: 12 };
    });

    this.service.getAllBaoCaoForFilter(this.filterApply).subscribe(data => {      
      const result = this.aggregateMaterials(data);      
      const dataRes = JSON.parse(result);      

      const listVL:any = {
        "Bê tông": 'C',
        "D219, L=12m": 'D',
        "D219, L=1m": 'E',
        'D90, L=3,2m': 'F',
        'D113,5, L=6m': 'G',
        'D113,5, L=4m': 'H',
        'D126,8, L=5,5m': 'I',
        'D141,3, L=6,5m': 'J',
        'D168,3, L=7,5m': 'K',
        '1,2m x 2,4m': 'L',
        '1m x 2m': 'M',
        '0,8m x 1,7m': 'N',
        '0,7m x 1,4m': 'O',
        '1,8m x 1,8m': 'P',
        '1,5m x 1,5m': 'Q',
        '1,2m x 1,2m': 'R',
        '1,2m x 0,7m': 'S',
        '1,2m x 0,8m': 'T',
        '1,2m x 0,4m': 'U',
        '12m': 'V',
        '18m': 'W',
        'BH phụ (0,4m x 0,3m)': 'X',
        'D1200': 'Y',
        'D2000': 'Z',
        'Xích': 'AA',
        '1,2m x 1,2m!': 'AB',
        '0,6m x 0,6m': 'AC',
        'Thước nước ngược': 'AD',
        'Bảng tên cầu': 'AE',
        'BH phụ (0,4m x 0,3m)!': 'AF',
        'Cột': 'AG',
        'TĐ 12m': 'AH',
        'TĐ 18m': 'AI',
        'Phao': 'AJ',
        'Trên cầu': 'AK'
      }
      
      dataRes.forEach((item: any, index: number) => {
        let count = 9
        sheet.getCell(`A${index + count}` ).value = index + 1;
        sheet.getCell(`B${index + count}` ).value = item.name_cong_trinh;
        sheet.getCell(`AL${index + count}` ).value = item.trip || '-';
        sheet.getCell(`A${index + count}`).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
        sheet.getCell(`AL${index + count}`).alignment = {wrapText: true, horizontal: 'center', vertical: 'middle' };
        sheet.getCell(`A${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
        sheet.getCell(`AL${index + count}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
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
        10, 50,
      ];
      columnWidths.forEach((width, index) => {
        sheet.getColumn(index + 1).width = width;
      });
      sheet.getRow(8).height = 50;
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'BÁO CÁO ĐỊNH NGACH - QUÝ II, NĂM 2025.xlsx');
      });
    });   
    
  }

  shortenTitleByValue(value: any){    
    let data: string[][] = [];
    if(value === 'BDPQ'){
      
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Số lượng báo hiệu', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        // ['', '', 'Bờ trái', 'Bờ phải', 'Trên bờ', 'Dưới nước'],
        ['', '','Trên bờ', 'Dưới nước'],
        [''],
        ['', '', 'Móng\nBê\ntông', 'Móng\nD219,\nL=12m', 'Móng\nD219,\nL=1m', 'Cột\nD90,\nL=3,2m', 'Cột\nD113,5,\nL=6m', 'Cột\nD113,5,\nL=4m', 'Cột\nD126,8,\nL=5,5m', 'Cột\nD141,3,\nL=6,5m',
           'Cột\nD168,3,\nL=7,5m', 'Bảng\n1,2m\nx\n2,4m', 'Bảng\n1m\nx\n2m', 'Bảng\n0,8m\nx\n1,7m', 'Bảng\n0,7m\nx\n1,4m', 'Bảng\n1,8m\nx\n1,8m', 'Bảng\n1,5m\nx\n1,5m', 'Bảng\n1,2m\nx\n1,2m', 'Bảng\n1,2m\nx\n0,7m',
           'Bảng\n1,2m\nx\n0,8m', 'Bảng\n1,2m\nx\n0,4m', 'Trụ đèn\n12m', 'Trụ đèn\n18m', 'Trụ đèn\nBH phụ\n(0,4m\nx\n0,3m)', 'Phao\nD1200', 'Phao\nD2000', 'Phao\nXích', 'Báo hiệu\n1,2m\nx\n1,2m', 'Báo hiệu\n0,6m\nx\n0,6m', 'Báo hiệu\nThước\nnước\nngược', 
           'Bảng\ntên\ncầu', 'BH\nphụ\n(0,4m\nx\n0,3m)', 'Cột', 'TĐ\n12m', 'TĐ\n18m', 'Phao', 'Trên\ncầu']
      ];

    }
    if(value === 'SMPQ'){
      
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Số lượng báo hiệu', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        // ['', '', 'Bờ trái', 'Bờ phải', 'Trên bờ', 'Dưới nước'],
        ['', '','Trên bờ', 'Dưới nước'],
        [''],
        ['', '', 'Móng\nBê\ntông', 'Móng\nD219,\nL=12m', 'Móng\nD219,\nL=1m', 'Cột\nD90,\nL=3,2m', 'Cột\nD113,5,\nL=6m', 'Cột\nD113,5,\nL=4m', 'Cột\nD126,8,\nL=5,5m', 'Cột\nD141,3,\nL=6,5m',
           'Cột\nD168,3,\nL=7,5m', 'Bảng\n1,2m\nx\n2,4m', 'Bảng\n1m\nx\n2m', 'Bảng\n0,8m\nx\n1,7m', 'Bảng\n0,7m\nx\n1,4m', 'Bảng\n1,8m\nx\n1,8m', 'Bảng\n1,5m\nx\n1,5m', 'Bảng\n1,2m\nx\n1,2m', 'Bảng\n1,2m\nx\n0,7m',
           'Bảng\n1,2m\nx\n0,8m', 'Bảng\n1,2m\nx\n0,4m', 'Trụ đèn\n12m', 'Trụ đèn\n18m', 'Trụ đèn\nBH phụ\n(0,4m\nx\n0,3m)', 'Phao\nD1200', 'Phao\nD2000', 'Phao\nXích', 'Báo hiệu\n1,2m\nx\n1,2m', 'Báo hiệu\n0,6m\nx\n0,6m', 'Báo hiệu\nThước\nnước\nngược', 
           'Bảng\ntên\ncầu', 'BH\nphụ\n(0,4m\nx\n0,3m)', 'Cột', 'TĐ\n12m', 'TĐ\n18m', 'Phao', 'Trên\ncầu']
      ];

    }
    if(value === 'VSDN'){
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu'],
        // ['', '', 'Bờ trái', 'Bờ phải', 'Trên bờ', 'Dưới nước'],        
      ];

    }

    if(value === 'DCP') {
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Số lượng báo hiệu'],        
      ];
    }

    if(value === 'CBR') {
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu', 'Số lượng báo hiệu'],        
      ];
    }

    if(value === 'HT') {
      data = [
        [''],[''],[''],[''],
        ['Stt', 'Tên sông, kênh, rạch - Cầu - Báo hiệu'],        
      ];
    }
    return data
  }

  shortenProjectNameByValue(value: any) {
    let data = {}

    if(value === 'BDPQ') {
      data = {
        "Móng bê tông": 'C',
        "Móng D219, L=12m": 'D',
        "Móng D219, L=1m": 'E',
        'Cột D90, L=3,2m': 'F',
        'Cột D113,5, L=6m': 'G',
        'Cột D113,5, L=4m': 'H',
        'Cột D126,8, L=5,5m': 'I',
        'Cột D141,3, L=6,5m': 'J',
        'Cột D168,3, L=7,5m': 'K',
        'Bảng 1,2m x 2,4m': 'L',
        'Bảng 1m x 2m': 'M',
        'Bảng 0,8m x 1,7m': 'N',
        'Bảng 0,7m x 1,4m': 'O',
        'Bảng 1,8m x 1,8m': 'P',
        'Bảng 1,5m x 1,5m': 'Q',
        'Bảng 1,2m x 1,2m': 'R',
        'Bảng 1,2m x 0,7m': 'S',
        'Bảng 1,2m x 0,8m': 'T',
        'Bảng 1,2m x 0,4m': 'U',
        'Trụ đèn 12m': 'V',
        'Trụ đèn 18m': 'W',
        'Trụ đèn BH phụ (0,4m x 0,3m)': 'X',
        'Phao D1200': 'Y',
        'Phao D2000': 'Z',
        'Phao Xích': 'AA',
        'Báo hiệu 1,2m x 1,2m': 'AB',
        'Báo hiệu 0,6m x 0,6m': 'AC',
        'Báo hiệu Thước nước ngược': 'AD',
        'Bảng tên cầu': 'AE',
        'BH phụ (0,4m x 0,3m)': 'AF',
        'Cột': 'AG',
        'TĐ 12m': 'AH',
        'TĐ 18m': 'AI',
        'Phao': 'AJ',
        'Trên cầu': 'AK'
      }
      
    }

    if(value === 'SMPQ') {
      data = {
        "Móng bê tông": 'C',
        "Móng D219, L=12m": 'D',
        "Móng D219, L=1m": 'E',
        'Cột D90, L=3,2m': 'F',
        'Cột D113,5, L=6m': 'G',
        'Cột D113,5, L=4m': 'H',
        'Cột D126,8, L=5,5m': 'I',
        'Cột D141,3, L=6,5m': 'J',
        'Cột D168,3, L=7,5m': 'K',
        'Bảng 1,2m x 2,4m': 'L',
        'Bảng 1m x 2m': 'M',
        'Bảng 0,8m x 1,7m': 'N',
        'Bảng 0,7m x 1,4m': 'O',
        'Bảng 1,8m x 1,8m': 'P',
        'Bảng 1,5m x 1,5m': 'Q',
        'Bảng 1,2m x 1,2m': 'R',
        'Bảng 1,2m x 0,7m': 'S',
        'Bảng 1,2m x 0,8m': 'T',
        'Bảng 1,2m x 0,4m': 'U',
        'Trụ đèn 12m': 'V',
        'Trụ đèn 18m': 'W',
        'Trụ đèn BH phụ (0,4m x 0,3m)': 'X',
        'Phao D1200': 'Y',
        'Phao D2000': 'Z',
        'Phao Xích': 'AA',
        'Báo hiệu 1,2m x 1,2m': 'AB',
        'Báo hiệu 0,6m x 0,6m': 'AC',
        'Báo hiệu Thước nước ngược': 'AD',
        'Bảng tên cầu': 'AE',
        'BH phụ (0,4m x 0,3m)': 'AF',
        'Cột': 'AG',
        'TĐ 12m': 'AH',
        'TĐ 18m': 'AI',
        'Phao': 'AJ',
        'Trên cầu': 'AK'
      }
      
    }


    if(value === 'VSDN') {
      data = {        
        'Cột': 'C',
        'TĐ 12m': 'D',
        'TĐ 18m': 'E',
        'Phao': 'F',
        'Trên cầu': 'G'
      }
    }

    if(value === 'DCP') {
      data = {        
        'Phao D1200': 'C',
        'Phao D2000': 'D',
      }
    }

    if(value === 'CBR') {
      data = {        
        'Phao D1200': 'C',
        'Phao D2000': 'D',
      }
    }
    
    return data
    
  }

  exportExcelAllFiles(){      
    
    if (!this.filterApply.year && !this.filterApply.quarter) {
      this.filterApply['year'] = new Date().getFullYear()
      this.filterApply['quarter'] = this.getQuy(new Date())

    }
    this.exportExcel(this.listExportBcDinhNgach)
  }

  getQuy(date: any) {
    const month = date.getMonth() + 1;
    if (month <= 3) {
      return 'Quý 1';
    } else if (month <= 6) {
      return 'Quý 2';
    } else if (month <= 9) {
      return 'Quý 3';
    } else {
      return 'Quý 4';
    }
  }
  
 

  exportExcel(data: any) {
    const workbook = new ExcelJS.Workbook();
  
    // Danh sách các promise chờ dữ liệu cho mỗi sheet
    const sheetPromises = data.map((item: any) => {
      const sheet = workbook.addWorksheet(item.name);
      const rows = this.shortenTitleByValue(item.value);
  
      rows.forEach(row => sheet.addRow(row));
      console.log('this.filterApply',this.filterApply)
  
      // Gọi API lấy dữ liệu cho từng sheet
      return new Promise<void>((resolve) => {
        this.service.getAllBaoCaoForFilter(this.filterApply).subscribe(response => {
          const result = this.aggregateMaterials(response);     
          const dataRes = JSON.parse(result);      
          const listVL: any = this.shortenProjectNameByValue(item.value);
  
          const baseRow = 9;
  
          dataRes.forEach((rowItem: any, rowIndex: number) => {
            const rowNum = rowIndex + baseRow;
            sheet.getCell(`A${rowNum}`).value = rowIndex + 1;
            sheet.getCell(`B${rowNum}`).value = rowItem.name_cong_trinh;
  
            if (item.value === 'HT') {
              sheet.getCell(`C${rowNum}`).value = rowItem.trip || '-';
              sheet.getCell(`C${rowNum}`).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
              sheet.getCell(`C${rowNum}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
            }
  
            // format A/B column
            ['A', 'B'].forEach(col => {
              sheet.getCell(`${col}${rowNum}`).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
              sheet.getCell(`${col}${rowNum}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
            });
  
            rowItem.chi_tiet.forEach((detail: any) => {
              const materialKey = detail['Vật liệu'];
              const cellKey = listVL[materialKey];
              const value = detail['Số lượng nhập'] || '-';
  
              if (cellKey) {
                sheet.getCell(`${cellKey}${rowNum}`).value = value;
                sheet.getCell(`${cellKey}${rowNum}`).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                sheet.getCell(`${cellKey}${rowNum}`).font = { bold: true, color: { argb: 'FF0000FF' }, name: 'Times New Roman' };
              }
            });
          });
  
          sheet.getColumn(1).width = 10;          
          sheet.getColumn(2).width = 50;          
          sheet.getRow(8).height = 80;
  
          // Gọi hàm merge + tiêu đề sau khi có sheet
          this.formatSheetByValue(sheet, item.value);
  
          resolve(); // báo hiệu sheet này xử lý xong
        });
      });
    });

    const nameQuarterByFilter = this.formatNameQuarter(this.filterApply);
  
    // Khi tất cả các sheet đều xong => export
    Promise.all(sheetPromises).then(() => {
      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, `BÁO CÁO ĐỊNH NGACH - QUÝ ${nameQuarterByFilter}, NĂM ${this.filterApply.year}.xlsx`);
      });
    });
  }

  formatNameQuarter(filterApply: any) {
    const quarter = filterApply.quarter;
    if(quarter == 'Quý 1'){
      return 'I';
    }else if(quarter == 'Quý 2'){
      return 'II';
    }else if(quarter == 'Quý 3'){
      return 'III';
    }else{
      return 'IV';
    }
    
  }

  formatSheetByValue(sheet: ExcelJS.Worksheet, value: string) {
    // Merge ô A1 đến A4 (áp dụng cho tất cả loại)
    sheet.mergeCells('A1:AK1');
    sheet.mergeCells('A2:AK2');
    sheet.mergeCells('A3:AK3');
    sheet.mergeCells('A4:AK4');
    sheet.mergeCells('A5:A8');
    sheet.mergeCells('B5:B8');
  
    // Đặt tiêu đề mặc định
    const titleMap: Record<string, string> = {
      BDPQ: 'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO BẢO DƯỠNG PHÁT QUANG',
      SMPQ: 'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO SƠN MÀU PHÁT QUANG',
      VSDN: 'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO VỆ SINH ĐÈN NĂNG',
      DCP:  'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO ĐIỀU CHỈNH PHAO',
      CBR:  'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO CHỐNG BÔI RỬA',
      HT:   'BẢNG TỔNG HỢP HỆ THỐNG BÁO CÁO HÀNH TRÌNH'
    };
  
    const title = titleMap[value] || 'BẢNG TỔNG HỢP';
    sheet.getCell('A1').value = title;
    sheet.getCell('A2').value = 'CÔNG TRÌNH: BẢO TRÌ CÔNG TRÌNH ĐƯỜNG THUỶ NỘI ĐỊA NĂM 2024';
    sheet.getCell('A3').value = 'GÓI THẦU: BẢO TRÌ CÔNG TRÌNH ĐƯỜNG THUỶ NỘI ĐỊA KHU VỰC 1';
    sheet.getCell('A4').value = 'ĐỊA ĐIỂM: KHU VỰC QUẬN, HUYỆN, THÀNH PHỐ HỒ CHÍ MINH';
    sheet.getCell('A5').value = 'Stt';
  
    // Căn giữa và border các dòng tiêu đề
    ['A1', 'A2', 'A3', 'A4'].forEach((cell) => {
      sheet.getCell(cell).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
      sheet.getCell(cell).font = { bold: true, size: cell === 'A1' ? 16 : 12 };
      sheet.getCell(cell).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  
    // Tùy biến theo từng loại báo cáo
    switch (value) {
      case 'BDPQ':
      case 'SMPQ':
        sheet.mergeCells('C5:AF5');
        sheet.mergeCells('C6:X6');
        sheet.mergeCells('Y6:AA6');
        sheet.mergeCells('AB6:AF6');
        sheet.mergeCells('C7:E7');
        sheet.mergeCells('F7:K7');
        sheet.mergeCells('L7:T7');
        sheet.mergeCells('V7:X7');
        sheet.mergeCells('Y7:AA7');
        sheet.mergeCells('AB7:AD7');
        sheet.mergeCells('AE7:AE8');
        sheet.mergeCells('AF7:AF8');
        sheet.mergeCells('AG5:AK5');
        sheet.mergeCells('AG6:AI6');
        sheet.mergeCells('AG7:AG8');
        sheet.mergeCells('AH7:AH8');
        sheet.mergeCells('AI7:AI8');
        sheet.mergeCells('AJ6:AJ8');
        sheet.mergeCells('AK6:AK8');
  
        // Đặt tên header tùy biến
        sheet.getCell('AD6').value = 'Trên cầu';
        sheet.getCell('AA6').value = 'Dưới nước';
        sheet.getCell('E7').value = 'Móng';
        sheet.getCell('H7').value = 'Cột';
        sheet.getCell('N7').value = 'Bảng';
        sheet.getCell('X7').value = 'Trụ đèn';
        sheet.getCell('AA7').value = 'Phao';
        sheet.getCell('AD7').value = 'Báo hiệu';
        sheet.getCell('AE7').value = 'Bảng\ntên\ncầu';
        sheet.getCell('AF7').value = 'BH phụ (0,4m x 0,3m)';
        sheet.getCell('AG5').value = 'ĐÈN BÁO HIỆU';
        sheet.getCell('AH6').value = 'Trên bờ';
        sheet.getCell('AG7').value = 'Cột';
        sheet.getCell('AH7').value = 'TĐ\n12m';
        sheet.getCell('AI7').value = 'TĐ\n18m';
        sheet.getCell('AJ6').value = 'Phao';
        sheet.getCell('AK6').value = 'Trên\ncầu';
        break;
  
      case 'VSDN':
        sheet.mergeCells('C5:G5');
        sheet.mergeCells('C6:E6');
        sheet.mergeCells('C7:C8');
        sheet.mergeCells('D7:D8');
        sheet.mergeCells('E7:E8');
        sheet.mergeCells('F6:F8');
        sheet.mergeCells('G6:G8');
        sheet.mergeCells('AG6:AI6');
        sheet.mergeCells('AG7:AG8');
        sheet.mergeCells('AH7:AH8');
        sheet.mergeCells('AI7:AI8');
        sheet.mergeCells('AJ6:AJ8');
        sheet.mergeCells('AK6:AK8');
  
        sheet.getCell('C5').value = 'ĐÈN BÁO HIỆU';
        sheet.getCell('C6').value = 'Trên bờ';
        sheet.getCell('F6').value = 'Phao';
        sheet.getCell('G6').value = 'Trên cầu';
        sheet.getCell('C7').value = 'Cột';
        sheet.getCell('D7').value = 'TĐ\n12m';
        sheet.getCell('E7').value = 'TĐ\n18m';
        break;
  
      case 'DCP':
      case 'CBR':
        sheet.mergeCells('C5:D5');
        sheet.mergeCells('C6:D6');
        sheet.mergeCells('C7:D7');
  
        sheet.getCell('C6').value = 'Dưới nước';
        sheet.getCell('C7').value = 'Phao';
        sheet.getCell('C8').value = 'D1200';
        sheet.getCell('D8').value = 'D2000';
        break;
  
      case 'HT':
        sheet.mergeCells('C5:C8');
        sheet.getCell('C5').value = 'Hành trình';
        break;
    }
  
    // Apply định dạng căn giữa + in đậm cho các cell quan trọng
    const importantCells = [
      'A5', 'B5', 'C5', 'E5', 'E6', 'AI5', 'AI6', 'AI7',
      'C6', 'C7', 'D6', 'AA6', 'AD6', 'E7', 'H7', 'N7', 'X7',
      'AA7', 'AD7', 'AG7', 'AH7', 'C8', 'D8', 'E8', 'F8', 'G8',
      'H8', 'I8', 'J8', 'K8', 'L8', 'M8', 'N8', 'O8', 'P8', 'Q8',
      'R8', 'S8', 'T8', 'U8', 'V8', 'W8', 'X8', 'Y8', 'Z8', 'AA8',
      'AB8', 'AC8', 'AD8', 'AE8', 'AF8', 'AG8', 'AH8', 'AI8', 'AJ8', 'AK8', 'AL8', 'AM8'
    ];
    importantCells.forEach(cell => {
      const c = sheet.getCell(cell);
      c.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
      c.font = { bold: true };
    });
  }
  
  

  aggregateMaterials(data:any) {
    const result:any = [];
  
    data.forEach((item:any) => {
      const { name_cong_trinh, chi_tiet, trip } = item;

    // Tìm công trình đã có trong kết quả
    let existingProject = result.find((r: any) => r.name_cong_trinh === name_cong_trinh);

    if (!existingProject) {
      existingProject = {
        name_cong_trinh,
        chi_tiet: [],
        trip: 0,
      };
      result.push(existingProject);
    }

    // ✅ Chỉ cộng trip 1 lần duy nhất cho mỗi item
    existingProject.trip += Number(trip) || 0;
     
    chi_tiet.forEach((detail: any) => {
      const materialName = detail["Vật liệu"];
      const quantity = parseInt(detail["Số lượng nhập"]) || 0;

      let existingMaterial = existingProject.chi_tiet.find((m: any) => m["Vật liệu"] === materialName);
      if (existingMaterial) {
        existingMaterial["Số lượng nhập"] += quantity;
      } else {
        existingProject.chi_tiet.push({
          "Vật liệu": materialName,
          "Số lượng nhập": quantity,
        });
      }
    });
  });

  return JSON.stringify(result, null, 2);
  }
  

  


}
