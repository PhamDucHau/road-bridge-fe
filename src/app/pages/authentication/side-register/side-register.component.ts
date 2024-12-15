import { Component, inject, Inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { SideRegisterService } from './side-register.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, OverlayModule,CommonModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  private _snackBar = inject(MatSnackBar)
  options = this.settings.getOptions();
  public loadingSpinner = false;

  constructor(private settings: CoreService, private router: Router, private sideRegisterService: SideRegisterService) { }

  form = new FormGroup({
    name_user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role_id: new FormControl('3', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  durationInSeconds = 3;

  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  submit() {
    this.loadingSpinner = true
    console.log(this.form.value);
    this.sideRegisterService.getRegister(this.form.value).subscribe((res) => {
      console.log('res', res);
      if(res){
        this.loadingSpinner = false
        this.openSnackBar('Thêm tài khoản thành công, bạn đã có thể login', 'success');
        this.form.reset();
      }
      
    },
    (error: any) => {
      this.loadingSpinner = false
      this.openSnackBar(error.error.message, 'error');
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
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

