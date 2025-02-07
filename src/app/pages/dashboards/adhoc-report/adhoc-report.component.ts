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
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, TablerIconsModule,],
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
  public productsList: any = [];
  public nhapKhoList: any = [];
  public indexSanPham: number = 0;

  public formSave: any = {}
  public dataSanPham: any = []
  public dataSanPhamEdit: any = []


  public diaDiem: any = [];
  form: FormGroup;
  public idParam: any = '';

  

  ngOnInit() {
    this.idParam = this.route.snapshot.paramMap.get('id');
    if (this.idParam) {
      const api1$ = this.service.getAllDataForm();
      const api2$ = this.service.getBaoCaoById(this.idParam);
      const api3$ = this.service.getAllDataNhapKho();
      forkJoin([api1$, api2$, api3$]).subscribe({
        next: ([res1, res2, res3]) => {    
          // console.log('res1', res1)   
          // console.log('res2', res2)   
          // console.log('res3', res3)
          this.congTrinhDiaDiem = res1
          this.congTrinhControl = new FormControl(res2.data.name_cong_trinh);
          this.diaDiemControl = new FormControl(res2.data.name_dia_diem);
          this.productsListControl = new FormControl(res2.data.du_an);
          this.congTrinhCurrent = res2.data.name_cong_trinh.trim()
          this.diaDiemCurrent = res2.data.name_dia_diem.trim()
          res1.map((item: any) => this.congTrinhOption.push(item.name_cong_trinh))
          this.congTrinhFilterOption = this.congTrinhControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterCongTrinh(value || '', this.congTrinhOption))
          )
          this.congTrinhDiaDiem.map((item: any) => {
            this.diaDiemControl.enable();
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
  onFocusDiaDiem() {

  }

  onBlurDiaDiem() {
    this.isDropdownOpen = false;
  }

  getTitleKey(data: any) {
    const keysWithoutId = Object.keys(data[0]).filter(key => key !== '_id');

    return keysWithoutId;
  }

  selectFile(event: any, index: number): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      // this.local_data.imagePath = reader.result;
      this.service.uploadFile(event.target.files[0]).subscribe((res: any) => {
        // console.log(res);
        this.dataSanPham[index]['Hình ảnh hư hại'] = res.url
      })
      
    };
  }


  onOptionSelectedCongTrinh(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;
    const isIncluded = this.congTrinhOption.some((item: any) => item.trim() === selectedValue.trim());
    if (isIncluded) {
      this.congTrinhCurrent = selectedValue.trim()
      this.diaDiemControl.enable();
      const value = this.congTrinhControl.value || ''
      this.congTrinhDiaDiem.map((item: any) => {
        if (item.name_cong_trinh.trim() === value.trim()) {
          this.diaDiemOption = []
          this.diaDiemControl = new FormControl('');
          item.chi_tiet.map((item2: any) => {
            this.diaDiemOption.push(item2.name_dia_diem)
          })
        }
      })
      this.diaDiemOption = [...new Set(this.diaDiemOption)];
      this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDiaDiem(value || '', this.diaDiemOption))
      )

    }
    // Thêm logic tùy chỉnh của bạn tại đây
  }
  onOptionSelectedDiaDiem(event: MatAutocompleteSelectedEvent): void {   
    this.productsListControl = new FormControl('');
    this.indexSanPham = 0
    const selectedValue = event.option.value;
    if (this.diaDiemControl.value) {
      this.diaDiemCurrent = this.diaDiemControl.value.trim()
      this.isProducts = true
      this.congTrinhDiaDiem.map((item: any) => {
        if (item.name_cong_trinh.trim() === this.congTrinhCurrent.trim()) {
          item.chi_tiet.map((item2: any) => {
            if (item2.name_dia_diem.trim() === this.diaDiemCurrent.trim()) {
              this.productsList = item2.chi_tiet
              this.duAnFilterOption = this.productsListControl.valueChanges.pipe(
                startWith(''),
                map((value) => this._filterDuAn(value || '', this.productsList))
              )
            }
          })
        }
      })

      this.service.getAllDataNhapKho().subscribe(res => {
        const congTrinh = (this.congTrinhControl.value || '').trim();
        res.map((item: any) => {
          if (item.name_cong_trinh.trim() === congTrinh) {
            this.nhapKhoList = item.chi_tiet
          }
        })
        // console.log('this.nhapKhoList', this.nhapKhoList)
        // this.nhapKhoList = this.nhapKhoList.filter((item: any) => item['Số lượng nhập'] > 0)
        this.nhapKhoList.forEach((item: any) => {
          this.dataSanPham.push({
            'Vật liệu': item['Vật liệu'],
            'Số lượng nhập': 0,
            'Đơn giá': 0,
            'Mô tả hư hại': null,
            'Hình ảnh hư hại': null
          })
        })

      })
    }
    // Thêm logic tùy chỉnh của bạn tại đây
  }

  private _filterCongTrinh(value: string, congTrinhOption: any): any {
    // console.log('cong trinh', congTrinhOption)
    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDiaDiem(value: string, diaDiemOption: any): string[] {
    // console.log('dia diem', diaDiemOption)
    const filterValue = value.toLowerCase();
    return diaDiemOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDuAn(value: string, congTrinhOption: any): string[] {
    // console.log('du an', congTrinhOption)
    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // option group

  save(status:string): void {    
    if(!this.productsListControl.value){      
      return this.openSnackBar('Field dự án đang trống', 'error');
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
        if(this.idParam){
          formSave = {
            _id: this.idParam,
            name_cong_trinh: this.congTrinhCurrent,
            name_dia_diem: this.diaDiemCurrent,
            du_an: this.productsListControl.value,
            chi_tiet: this.dataSanPham,
            status: status
          }          
        }else{
          formSave = {
            name_cong_trinh: this.congTrinhCurrent,
            name_dia_diem: this.diaDiemCurrent,
            du_an: this.productsListControl.value,
            chi_tiet: this.dataSanPham,
            status: status
          }
        }        
        let count = 0
        this.dataSanPham.forEach((item: any) => {
          if (item['Số lượng nhập'] > 0 || item['Đơn giá'] > 0) {
            count = count + 1
          }
        })        
        if(count > 0){
          // console.log('formSave', formSave)
          
          if(this.idParam){
            this.service.updateDataBaoCao(formSave).subscribe(res => {            
              if(res){
                this.openSnackBar('Câp nhật báo cáo thành công', 'success');
                this.router.navigate(['/dashboards/dashboard1']);
              }      
            })
          }else{
            this.service.createDataBaoCao(formSave).subscribe(res => {            
              if(res){
                this.openSnackBar('Thêm báo cáo thành công', 'success');
                this.router.navigate(['/dashboards/dashboard1']);
              }      
            })
          }
        }else{      
          this.loadingSpinner = false;
          this.openSnackBar('Thêm dữ liệu không thành công', 'error');
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
