import { Component, Inject, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { SideLoginService } from './side-login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './side-login.component.html',
  styles: [`
    .custom-snackbar {
      background-color: #4caf50; /* Màu nền (xanh lá) */
      color: white; /* Màu chữ */
    }
  `]
})
export class AppSideLoginComponent {
  private _snackBar = inject(MatSnackBar);
  options = this.settings.getOptions();
  public loadingSpinner = false;

  constructor(
    private settings: CoreService, 
    private router: Router,
    private services: SideLoginService
  ) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
  
  }

  async submit() {

    this.loadingSpinner = true;
    this.services.getLogin(this.form.value).subscribe(
      response => {
        if(response) {          
          localStorage.clear();          
          setTimeout(() => {
            const role:any = [];
            // response.role.map((item:any) => role.push(item.name_role));            
            localStorage.setItem('tokens', response.accessToken);
            // localStorage.setItem('role', JSON.stringify(role));
            // localStorage.setItem('user_info', JSON.stringify(response.user_info));
            this.openSnackBar('Login successful', 'success');
            this.router.navigate(['/dashboards/dashboard1']);
          }, 2000);
        }
        
      },
      error => {
        this.loadingSpinner = false;
        this.openSnackBar('Login failed', 'error');
        
        
      }
    );
    // localStorage.clear();
    
    // if(this.form.value.uname === 'admin' && this.form.value.password == '123') {
    //   localStorage.setItem('tokens', '1');
    //   this.router.navigate(['/dashboard']);
    // }else{
    //   alert('Sai thông tin đăng nhập');
    //   this.router.navigate(['/dashboard']);
    // }
    
  }

  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  // openSnackBar(message: string, action: string) {
  //   // this._snackBar.open(message, action);
  //   this._snackBar.open(message, action, {
  //     duration: 3000,
  //     panelClass: ['custom-snackbar'] // Thêm class CSS tùy chỉnh
  //   });
  // }
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
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}


