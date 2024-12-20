import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { map, Observable, of, startWith } from 'rxjs';
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
    console.log(event);
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
  onFocusCongTrinh() {
    this.isDropdownOpen = true;
  }
  onFocusDiaDiem() {    
    
  }

  onBlurDiaDiem() {
    this.isDropdownOpen = false;
  }
  onBlurCongTrinh() {
    this.diaDiemControl.enable(); 
    const value = this.congTrinhControl.value || ''
    
    this.diaDiemOption = Object.keys(this.congTrinhDiaDiem[0][value])
    console.log('value',value)
    console.log('diaDiemOption',this.congTrinhOption)
    // if (!this.congTrinhOption.some((option:any) => value.toLowerCase().includes(option.trim().toLowerCase()))) {
    //   console.log('disable')
    //   this.diaDiemControl.disable();
    // }
    this.isDropdownOpen = true;
    this.diaDiemFilterOption = this.diaDiemControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDiaDiem(value || '', this.diaDiemOption))
    )
    this.isDropdownOpen = false;
  }
  getTitleKey(data: any) {
    const keysWithoutId = Object.keys(data[0]).filter(key => key !== '_id');
    console.log('keysWithoutId',keysWithoutId)
    return keysWithoutId;
  }
  // onInputUpdate() {
  //   console.log('test')
  //   console.log('Input value updated:', this.firstControl.value);
  // }

 

  // first option
  // private _filter(value: string): string[] {   
  //   const filterValue = value.toLowerCase();

  //   return this.firstoption.filter((option) =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }

  private _filterCongTrinh(value: string, congTrinhOption: any): string[] {    
    const filterValue = value.toLowerCase();
    return congTrinhOption.filter((option:any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDiaDiem(value: string, congTrinhOption: any): string[] {       
    const filterValue = value.toLowerCase();
    const res = congTrinhOption.filter((option:any) =>
      option.toLowerCase().includes(filterValue)
    );
    console.log('res1',res)
    if(this.diaDiemControl.value){
      console.log('res2',res)
      this.isProducts = true
      this.productsList = this.congTrinhDiaDiem[0][this.congTrinhControl.value || ''][this.diaDiemControl.value]
      console.log('this.productsList',this.productsList)
    }
    return res
  }
  
  // option group
 

  
}
