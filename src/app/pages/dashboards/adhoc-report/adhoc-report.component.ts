import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { map, Observable, startWith } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';


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
  constructor(private _formBuilder: FormBuilder) {}
  isDropdownOpen: boolean = false;

  onFileSelected(event: any) {
    console.log(event);
  }
  triggerFileUpload() {
    
  }

  // Toggle dropdown state when the input gets focus or loses focus
  onFocus() {
    this.isDropdownOpen = true;
  }

  onBlur() {
    this.isDropdownOpen = false;
  }

   // first option
  firstControl = new FormControl('');
  firstoption: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  // option group
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  // filter option
  filterControl = new FormControl('');
  searchoption: string[] = ['One', 'Two', 'Three'];
  searchfilteredOptions: Observable<string[]>;      

  ngOnInit() {
    // first option
    this.filteredOptions = this.firstControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    // option group
    

    // filter option
    this.searchfilteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._searchfilter(value || ''))
    );
  }

  // first option
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.firstoption.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // option group
 

  // filter option
  private _searchfilter(value: string): string[] {
    const searchfilterValue = value.toLowerCase();

    return this.searchoption.filter((searchoption) =>
      searchoption.toLowerCase().includes(searchfilterValue)
    );
  }
  
  
}
