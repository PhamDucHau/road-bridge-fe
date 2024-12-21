import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { forkJoin, map, Observable, of, startWith } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { dashboardService } from '../dashboard.service';


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
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './adhoc-report.component.html',
  styleUrl: './adhoc-report.component.scss'
})
export class AdhocReportComponent {  
  constructor(
    private _formBuilder: FormBuilder,
    private service: dashboardService,

  ) {}
  isDropdownOpen: boolean = false;
  

  onFileSelected(event: any) {

  }
  triggerFileUpload() {
    
  }

  // Toggle dropdown state when the input gets focus or loses focus
  

   // first option
  congTrinhControl = new FormControl('');
  diaDiemControl = new FormControl({ value: '', disabled: true });   

  // option group
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  // filter option
  filterControl = new FormControl(''); 
  public congTrinhDiaDiem: any = []; 
  public congTrinhOption: any = []; 
  public congTrinhFilterOption: Observable<string[]>;

  public diaDiemOption: any = []; 
  public diaDiemFilterOption: Observable<string[]>;
  public isProducts = false;
  public productsList : any = [];
  public nhapKhoList : any = [];
  public indexSanPham: number = 0;
  

  public diaDiem: any = []; 
  form: FormGroup;
  ngOnInit() {    
    // first option
    this.service.getAllDataForm().subscribe(res => {
      this.congTrinhDiaDiem = res
      this.congTrinhOption = this.getTitleKey(res)
      this.congTrinhFilterOption = this.congTrinhControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCongTrinh(value || '', this.congTrinhOption))
      )
      
    })   
    
    this.congTrinhFilterOption = this.congTrinhControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCongTrinh(value || '', this.congTrinhOption))
    )
    this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDiaDiem(value || '', this.diaDiemOption))
    )   
    
    // this.filteredOptions = this.firstControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
    // ;
    
    // option group
    // filter option
   
    
  }

  increaseIndex(){
    if(this.indexSanPham != this.productsList.length - 1){
      this.indexSanPham = this.indexSanPham + 1
    }    
  }
  decreaseIndex(){
    if(this.indexSanPham > 0){
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
  onBlurCongTrinh() {

  }
  getTitleKey(data: any) {
    const keysWithoutId = Object.keys(data[0]).filter(key => key !== '_id');
    
    return keysWithoutId;
  }
 

  onOptionSelectedCongTrinh(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;
    
    const isIncluded = this.congTrinhOption.some((item:any) => item.trim() === selectedValue.trim());
    
    if(isIncluded){
      this.diaDiemControl.enable();
      const value = this.congTrinhControl.value || ''
      this.diaDiemOption = Object.keys(this.congTrinhDiaDiem[0][value])
     
      this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDiaDiem('', this.diaDiemOption))
      ) 
      
    }
    // Thêm logic tùy chỉnh của bạn tại đây
  }
  onOptionSelectedDiaDiem(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;
   
    if(this.diaDiemControl.value){
      
      this.isProducts = true
      this.productsList = this.congTrinhDiaDiem[0][this.congTrinhControl.value || ''][this.diaDiemControl.value]
      
      this.service.getAllDataNhapKho().subscribe(res => {
        this.nhapKhoList = res[0][this.congTrinhControl.value || '']        
        this.nhapKhoList = this.nhapKhoList.filter((item: any) => item['Số lượng nhập'] > 0)
        
      })
    }
    // Thêm logic tùy chỉnh của bạn tại đây
  }

  private _filterCongTrinh(value: string, congTrinhOption: any): string[] {     
    const filterValue = value.toLowerCase();    
    return congTrinhOption.filter((option:any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDiaDiem(value: string, congTrinhOption: any): string[] {          
    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option:any) =>
      option.toLowerCase().includes(filterValue)
    );
  }  
  // option group
  
}
