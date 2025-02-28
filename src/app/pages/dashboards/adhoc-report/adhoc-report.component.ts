import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { forkJoin, map, Observable, of, startWith, tap } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { dashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ViewImageComponent } from '../common/view-image/view-image.component';
import { OverlayModule } from '@angular/cdk/overlay';


export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

// display option
export interface User {
  name: string;
}

// state

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-adhoc-report',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, TablerIconsModule, OverlayModule],
  templateUrl: './adhoc-report.component.html',
  styleUrl: './adhoc-report.component.scss',

})
export class AdhocReportComponent {

  imageUrl: string | null = null;
  private _snackBar = inject(MatSnackBar);
  public loadingSpinner = false;

  constructor(
    private _formBuilder: FormBuilder,
    private service: dashboardService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,


  ) {

  }
  isDropdownOpen: boolean = false;
  congTrinhControl = new FormControl('');
  diaDiemControl = new FormControl({ value: '', disabled: true });
  productsListControl = new FormControl('');
  noteControl = new FormControl('');
  // filter option
  filterControl = new FormControl('');
  public congTrinhDiaDiem: any = [];
  public congTrinhOption: any = [];
  public congTrinhFilterOption: Observable<string[]>;
  public congTrinhCurrent: string = '';

  public diaDiemOption: any = [];
  public diaDiemFilterOption: Observable<string[]>;
  public duAnFilterOption: Observable<string[]>;
  public diaDiemCurrent: string = '';
  public isProducts = false;
  public isDuAn = false;
  public productsList: any = [];
  public nhapKhoList: any = [];
  public indexSanPham: number = 0;

  public formSave: any = {}
  public dataSanPham: any = []
  public dataSanPhamEdit: any = []


  public diaDiem: any = [];
  form: FormGroup;
  public idParam: any = '';
  public infoReport: any;



  ngOnInit() {  
    this.idParam = this.route.snapshot.paramMap.get('id');
    if (this.idParam) {
      this.loadingSpinner = true
      const api1$ = this.service.getAllDataForm();
      const api2$ = this.service.getBaoCaoById(this.idParam);
      const api3$ = this.service.getAllDataNhapKho();
      forkJoin([api1$, api2$, api3$]).subscribe({
        next: ([res1, res2, res3]) => {
          this.loadingSpinner = false
          this.infoReport = res2
          this.congTrinhDiaDiem = res1
          this.congTrinhControl = new FormControl(res2.data.name_cong_trinh);
          this.diaDiemControl = new FormControl(res2.data.name_dia_diem);
          this.congTrinhControl.disable();
          this.diaDiemControl.disable();
          this.productsListControl = new FormControl(res2.data.du_an);

          this.noteControl = new FormControl(res2.data.note);
          this.congTrinhCurrent = res2.data.name_cong_trinh.trim()
          this.diaDiemCurrent = res2.data.name_dia_diem.trim()
          res1.map((item: any) => this.congTrinhOption.push(item.name_cong_trinh))
          this.congTrinhFilterOption = this.congTrinhControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterCongTrinh(value || '', this.congTrinhOption))
          )
          this.congTrinhDiaDiem.map((item: any) => {
            // this.diaDiemControl.enable();
            if (item.name_cong_trinh.trim() === res2.data.name_cong_trinh.trim()) {
              item.chi_tiet.map((item2: any) => {
                this.diaDiemOption.push(item2.name_dia_diem)
              })
              this.diaDiemOption = [...new Set(this.diaDiemOption)];
              this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
                startWith(''),
                map((value) => this._filterDiaDiem(value || '', this.diaDiemOption))
              )


              // _filterDuAn
            }
            if (item.name_cong_trinh.trim() === res2.data.name_cong_trinh.trim()) {
              item.chi_tiet.map((item2: any) => {
                if (item2.name_dia_diem.trim() === res2.data.name_dia_diem.trim()) {
                  this.productsList = item2.chi_tiet
                  this.indexSanPham = this.productsList.findIndex((item3: any) => item3.trim() === res2.data.du_an.trim())

                  this.duAnFilterOption = this.productsListControl.valueChanges.pipe(
                    startWith(''),
                    map((value) => this._filterDuAn(value || '', this.productsList))
                  )
                }
              })
            }
          })
          res3.map((item: any) => {

            if (item.name_cong_trinh.trim() === res2.data.name_cong_trinh.trim()) {
              this.nhapKhoList = item.chi_tiet
              
            }
          })
          this.isDuAn = true
          this.isProducts = true;
          
          res2.data.chi_tiet.map((item: any) => {

            this.dataSanPham.push({
              'Vật liệu': item['Vật liệu'],
              'Số lượng nhập': item['Số lượng nhập'],
              'Đơn giá': item['Đơn giá'],
              'Mô tả hư hại': item['Mô tả hư hại'],
              'Hình ảnh hư hại': item['Hình ảnh hư hại']
            })
            this.dataSanPhamEdit.push({
              'Vật liệu': item['Vật liệu'],
              'Số lượng nhập': item['Số lượng nhập'],
              'Đơn giá': item['Đơn giá'],
              'Mô tả hư hại': item['Mô tả hư hại'],
              'Hình ảnh hư hại': item['Hình ảnh hư hại']
            })
          })
          
        },
        error: (error) => {
        }
      });

    } else {
      this.service.getAllDataForm().subscribe(res => {
        this.congTrinhDiaDiem = res
       
        res.map((item: any) => this.congTrinhOption.push(item.name_cong_trinh))
        this.congTrinhFilterOption = this.congTrinhControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterCongTrinh(value || '', this.congTrinhOption))
        )
      })
    }

   
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

  public numberTitle = (numberProduct: number, index: number) => {
    
    let res = 0
    if (this.idParam) {
      res = numberProduct - (+this.dataSanPham[index]['Số lượng nhập']) + (+this.dataSanPhamEdit[index]['Số lượng nhập'])
    } else {
      res = numberProduct - (+this.dataSanPham[index]['Số lượng nhập'])
    }
   
    return res
  }

  increaseIndex() {
    if (this.indexSanPham != this.productsList.length - 1) {
      this.indexSanPham = this.indexSanPham + 1
    }
  }
  decreaseIndex() {
    if (this.indexSanPham > 0) {
      this.indexSanPham = this.indexSanPham - 1
    }
  }
  onFocusCongTrinh() {
    this.isDropdownOpen = true;
  }
  onFocusDiaDiem(){}



  onBlurDiaDiem() {
    
    this.isDropdownOpen = false;
  }

  getTitleKey(data: any) {
    const keysWithoutId = Object.keys(data[0]).filter(key => key !== '_id');

    return keysWithoutId;
  }

  // selectFile(event: any, index: number): void {
  //   if (!event.target.files[0] || event.target.files[0].length === 0) {      
  //     return;
  //   }
  //   const mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {

  //     return;
  //   }
    

  //   const reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);

  //   reader.onload = (_event) => {
  //     this.service.uploadFile(event.target.files[0]).subscribe((res: any) => {
       
  //       this.dataSanPham[index]['Hình ảnh hư hại'].push(res.url)
  //     })

  //   };
  // }

  selectFile(event: any, index: number): void {
    
    if(this.dataSanPham[index]['Hình ảnh hư hại'] === null){
      this.dataSanPham[index]['Hình ảnh hư hại'] = []
    }
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      // Kiểm tra MIME type (chỉ nhận ảnh)
      if (!file.type.match(/image\/*/)) {
        continue;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.service.uploadFile(file).subscribe((res: any) => {
          this.dataSanPham[index]['Hình ảnh hư hại'].push(res.url);
        });
      };
    }
  }
  


  onOptionSelectedCongTrinh(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;

    this.service.getAllDataNhapKho().subscribe(res => {
      const congTrinh = (this.congTrinhControl.value || '').trim();
      res.map((item: any) => {

        if (item.name_cong_trinh.trim() === congTrinh) {

          this.nhapKhoList = item.chi_tiet
        }
      })

      this.nhapKhoList.forEach((item: any) => {
        this.dataSanPham.push({
          'Vật liệu': item['Vật liệu'],
          'Số lượng nhập': 0,
          'Đơn giá': 0,
          'Mô tả hư hại': null,
          'Hình ảnh hư hại': []
        })
      })
      

      const isIncluded = this.congTrinhOption.some((item: any) => item.trim() === selectedValue.trim());


      if (isIncluded && this.nhapKhoList.length > 0) {

        this.congTrinhCurrent = selectedValue.trim()
        this.diaDiemControl.enable();
        const value = this.congTrinhControl.value || ''
        this.congTrinhDiaDiem.map((item: any) => {
          if (item.name_cong_trinh.trim() === value.trim()) {
            this.diaDiemOption = []
            this.diaDiemControl = new FormControl('');
            const diaDiemNoFull: any = []
            /// Điạ điểm đầy đủ cấu trúc thì push vô diaDiemOption,
            /// Địa điểm bị thiếu thì đẩy vô diaDiemNoFull
            item.chi_tiet.map((item2: any) => {

              if (item2.name_dia_diem) {
                this.diaDiemOption.push(item2.name_dia_diem)
              }
              else {
                diaDiemNoFull.push(item2)
              }
            })

            if (diaDiemNoFull.length > 0) {
              this.openSnackBar(`Đang có ${diaDiemNoFull.length} địa điểm chưa đầy đủ dữ liệu vui lòng check lại Database`, 'warning');
            }
          }
        })
        this.diaDiemOption = [...new Set(this.diaDiemOption)];

        this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterDiaDiem(value || '', this.diaDiemOption))
        )


      } else {

        this.openSnackBar('Trong kho chưa có vật liệu vui lòng chọn công trình khác hoặc kiểm tra lại Database', 'error');
      }

    })


    // Thêm logic tùy chỉnh của bạn tại đây
  }

  originalValue: any = null;
  isConfirmDialogOpen = false;
  onFocusDuAn() {
    
    if (!this.isConfirmDialogOpen) {
      this.originalValue = this.productsListControl.value;
      // console.log('this.originalValue: onFocus', this.originalValue)
    }
  }

  onOptionSelectedDuAn(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;   
    this.isConfirmDialogOpen = true;   
    
    // [formControl]="productsListControl"
    let count = 0
    this.dataSanPham.forEach((item: any) => {
      if (item['Số lượng nhập'] > 0 || item['Đơn giá'] > 0) {
        count = count + 1
      }
    })
    if(count > 0){
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '290px',
        data: {
          title: 'Đổi dự án',
          message: 'Bạn có chắc muốn đổi sang dự án khác ?',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isConfirmDialogOpen = false;
        if (result) {
          this.productsListControl.setValue(selectedValue);        
         this.dataSanPham.forEach((item: any, index: number) => {
           if( item['Số lượng nhập'] > 0){
            this.dataSanPham[index]['Số lượng nhập'] = 0
            this.dataSanPham[index]['Đơn giá'] = 0
            this.dataSanPham[index]['Mô tả hư hại'] = null
            this.dataSanPham[index]['Hình ảnh hư hại'] = null          
           }
         })
        } else {        
          this.productsListControl.setValue(this.originalValue);         
          }
  
      });
    }

    if (event.option.value) {
      this.isProducts = true

    }

  }
  onOptionSelectedDiaDiem(event: MatAutocompleteSelectedEvent): void {
    this.productsListControl = new FormControl('');
    this.indexSanPham = 0
    const selectedValue = event.option.value;
    if (this.diaDiemControl.value) {
      this.diaDiemCurrent = this.diaDiemControl.value.trim()

      // this.isProducts = true
      this.isDuAn = true


      this.congTrinhDiaDiem.map((item: any) => {

        if (item.name_cong_trinh.trim() === this.congTrinhCurrent.trim()) {
          item.chi_tiet.map((item2: any) => {
            if (item2.name_dia_diem) {
              if (item2.name_dia_diem.trim() === this.diaDiemCurrent.trim()) {

                this.productsList = item2.chi_tiet
                this.duAnFilterOption = this.productsListControl.valueChanges.pipe(
                  startWith(''),
                  map((value) => this._filterDuAn(value || '', this.productsList))
                )

              }
            }
          })
        }
      })


    }
    // Thêm logic tùy chỉnh của bạn tại đây
  }

  private _filterCongTrinh(value: string, congTrinhOption: any): any {
   
    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDiaDiem(value: string, diaDiemOption: any): string[] {
    
    const filterValue = value.toLowerCase();
    return diaDiemOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDuAn(value: string, congTrinhOption: any): string[] {

    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // option group

  deleteImage(index: number, i:any) {
    this.dataSanPham[i]['Hình ảnh hư hại'].splice(index, 1)
  }

  save(status: string): void {

    if (!this.productsListControl.value) {
      return this.openSnackBar('Field dự án đang trống', 'warning');
    }
    let count = 0
    // let countGia = 0
    let missingFields = 0
    let countNotpositive = 0
    this.dataSanPham.forEach((item: any) => {
      if (item['Số lượng nhập'] > 0 || item['Đơn giá'] > 0) {
        count = count + 1
      }
      // if(item['Đơn giá'] > 0 || item['Số lượng nhập'] < 0 && item['Đơn giá'] < 0 || item['Số lượng nhập'] > 0){
      //   missingFields = missingFields + 1
      // }
      if(item['Số lượng nhập'] > 0){
        if(item['Đơn giá'] < 0 || item['Đơn giá'] == 0 || item['Đơn giá'] == null){
          missingFields = missingFields + 1
        }
      }
      if(item['Đơn giá'] > 0){
        if(item['Số lượng nhập'] < 0 || item['Số lượng nhập'] == 0 || item['Số lượng nhập'] == null){
          missingFields = missingFields + 1
        }
      }
      if (item['Số lượng nhập'] < 0 || item['Đơn giá'] < 0 ) {
        countNotpositive = countNotpositive + 1
      }
    })
    if (count === 0) {
      return this.openSnackBar('Chưa có vật liệu nào được yêu cầu', 'warning');
    }
    if(missingFields > 0){
      return this.openSnackBar('Có vật liệu đang chưa đầy đủ, có thể thiếu số lượng hoặc đơn giá', 'warning');
    }
    // if (countGia === 0) {
    //   return this.openSnackBar('Chưa có đơn giá nào được yêu cầu', 'warning');
    // }
    if (countNotpositive > 0) {
      return this.openSnackBar('Mọi số liệu nhập phải là số dương, vui lòng check lại', 'warning');
    }

    let countFalse = 0
    
    this.nhapKhoList.forEach((item: any , index: number) => {
      const numberTitle = this.numberTitle(item['Số lượng nhập'], index)
      if (Number(numberTitle) < 0) {
        
        countFalse++
      }      
    }) 
    
    if (countFalse > 0) {
     
      return this.openSnackBar('Có vật liệu yêu cầu đang vụt mức kho, cần giảm số lượng', 'warning');
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '290px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data: {
        title: 'Tạo báo cáo',
        message: 'Bạn có chắc muốn tạo báo cáo này?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingSpinner = true;
        this.formSave[this.congTrinhCurrent] = {
          [this.diaDiemCurrent]: {
            'Công trình': this.productsList[this.indexSanPham],
            'Chi tiết': this.dataSanPham
          }
        }
        this.dataSanPham = this.dataSanPham.filter((item: any, index: any, self: any) =>
          index === self.findIndex((obj: any) => obj['Vật liệu'] === item['Vật liệu'])
        );
        let formSave = null
        // this.productsList = [...new Set(this.productsList)];
        if (this.idParam) {
          formSave = {
            _id: this.idParam,
            name_cong_trinh: this.congTrinhCurrent,
            name_dia_diem: this.diaDiemCurrent,
            du_an: this.productsListControl.value,
            chi_tiet: this.dataSanPham,
            status: status,
            note: this.noteControl.value
          }
        } else {
          formSave = {
            name_cong_trinh: this.congTrinhCurrent,
            name_dia_diem: this.diaDiemCurrent,
            du_an: this.productsListControl.value,
            chi_tiet: this.dataSanPham,
            status: status,
            note: this.noteControl.value
          }
        }




        if (formSave) {
          if (this.idParam) {
            this.service.updateDataBaoCao(formSave).subscribe(res => {
              if (res) {
                this.openSnackBar('Câp nhật báo cáo thành công', 'success');
                this.router.navigate(['/dashboards/dashboard1']);
              }
            })
          } else {
            this.service.createDataBaoCao(formSave).subscribe(res => {
              if (res) {
                this.openSnackBar('Thêm báo cáo thành công', 'success');
                this.router.navigate(['/dashboards/dashboard1']);
              }
            })
          }
        } else {
          this.loadingSpinner = false;
          this.openSnackBar('Thêm dữ liệu không thành công', 'warning');
        }
      }
    });


  }

  onInput(event: Event, i: number, label: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || null;
    this.dataSanPham[i][label] = value;
  }

  durationInSeconds = 3;
  openSnackBar(data: any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status }, // Truyền dữ liệu
    });
  }
}

@Component({
  selector: 'sussess-snackbar',
  template: `
   <span [class]="data.status">{{ data.message }}</span>

  `,
  styles: `
    .success {
      color: #13deb9 !important;
    }
    .error {
      color: red !important;
    }
  `,
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
