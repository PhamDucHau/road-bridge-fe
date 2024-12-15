import { Component, ElementRef, Inject, inject, Optional, ViewChild } from '@angular/core';
import { dashboardService } from '../../dashboard.service';



import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { courseContentList } from '../../coures-content-details-data';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/material.module';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { environment } from 'src/app/config/environments/environment';




@Component({
  selector: 'coures-content-details',
  standalone: true,
  imports: [
    MatCardModule, 
    TablerIconsModule, 
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatChipsModule, 
    MatSelectModule, 
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    OverlayModule
   
    
  ],
  templateUrl: './coures-content-details.component.html',
  styleUrl: './coures-content-details.component.scss'
})
export class CourseContentDetailsComponent {
  courseDetailId: any;
  courseDetail: any;
  istoggleReply: any;
  local_data: any;
  
  blogDetail: any = [
    {
      id: 1,
      time: '2 mins Read',
      imgSrc: '/assets/images/dashboar/1.png',
      user: '/assets/images/profile/user-3.jpg',
      title: 'Introduction to Structured Data',
      views: '9,125',
      category: 'BUS500',
      comments: 12,
      featuredPost: false,
      date: 'Sat, Dec 23',
    }
  ];
  isEdit: boolean = false;
  isAdd: boolean = false;
  dataContentList: any = courseContentList
  private subscription!: Subscription;
  public loadingSpinner = false;
  sourceContentDetailList$: Observable<any> | undefined;
  constructor(
    activatedRouter: ActivatedRoute, 
    private router: Router,
    public dashboardService: dashboardService, 
    public dialog: MatDialog,
    private sanitizer: DomSanitizer) {
    
    this.courseDetailId = activatedRouter?.snapshot?.paramMap?.get('id');
    
  }

  ngOnInit(): void {  

    this.loadingSpinner = true;
    this.sourceContentDetailList$ = this.dashboardService.sourceContentDetailList$;
    this.subscription = this.dashboardService.getAllCourseContentDetail(this.courseDetailId).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    )

    console.log('this.sourceContentDetailListzzz',this.sourceContentDetailList$);
  }
  isButtonPermission(): boolean {
    const role = JSON.parse(localStorage.getItem('role') || '[]');
    return ['Admin', 'Teacher'].some(r => role.includes(r));
  }

  goToDashboardDetail(): void {
    this.router.navigate([`/dashboard/${localStorage.getItem('courseId')}`]);
  }

  toggleReply(){}

  openDialogRemove(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    data.courseDetailId = this.courseDetailId
    this.dialog.open(AppDialogOverviewComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,

      data
      
    });
  }

  selectFile(event: any,idx:any): void {
    // console.log('idx',idx);
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
      this.dataContentList[idx].value = reader.result;
      // this.dataContentList[idx].value = reader.result
    };
  }

  safeUrl(res:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(res);
  }

  openDialog(action: string, obj: any): void {
    
    obj.action = action;
    obj.course_detail_id = this.courseDetailId;
    const dialogRef = this.dialog.open(AppDialogCourseContentDetailComponent, {
      data: obj,
     
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result.event === 'Add') {
      //   this.addRowData(result.data);
      // } else if (result.event === 'Update') {
      //   this.updateRowData(result.data);
      // } else if (result.event === 'Delete') {
      //   this.deleteRowData(result.data);
      // }
    });
  }

}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-dialog-course-content-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, OverlayModule, TablerIconsModule],
  templateUrl: 'add-dialog-course-content-detail.html',
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5); /* Làm mờ màn hình */
      z-index: 1000; /* Đảm bảo overlay ở trên cùng */
    }
  `],
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class AppDialogCourseContentDetailComponent {
  
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  public imageCurrent: any;
  public loadingSpinner = false;
  private _snackBar = inject(MatSnackBar)

  constructor(
    public datePipe: DatePipe,
    public dashboardService: dashboardService,
    public dialogRef: MatDialogRef<AppDialogCourseContentDetailComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = '';
    }
  }

  

  // doAction(): void {
  //   console.log('this.local_data',this.local_data)
  //   this.dialogRef.close({ event: this.action, data: this.local_data });
  // }
  saveCreate(): void {
    
    this.loadingSpinner = true
   
    // const formData = new FormData();
    console.log('this.local_data',this.local_data)
    // if (this.imageCurrent) {      
    //   formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    // } else {      
    //   formData.append('image', ''); 
    // }    
    // formData.append('course_detail_id', this.local_data.course_detail_id);
    // formData.append('value', this.local_data.value);
    // formData.append('type_id', this.local_data.type_id);
    // formData.append('bold', this.local_data.bold);
    const body= {
      course_detail_id: this.local_data.course_detail_id,
      value: this.local_data.value,
      type_id: this.local_data.type_id,
      bold: this.local_data.bold
    }
    this.dashboardService.createCourseContentDetail(body).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseContentDetail(this.local_data.course_detail_id).subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
              this.openSnackBar('Update successful', 'success');
              this.dialogRef.close({ event: this.action, data: this.local_data });
             }
            },
            (error: any) => {                 
              this.loadingSpinner = false; 
              console.error('Error fetching courses:', error);             
              this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
            }  
          );          
        }        
      },
      (error: any) => {
        // Case error: handle the error here
        this.openSnackBar(error.error.message, 'error');
        this.loadingSpinner = false;  // Stop spinner if error happens
        console.error('Error fetching courses:', error);
     
        // Optionally show an error message to the user
        this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
      } 
    );
    
  }

  saveEdit(): void {
    console.log('saveEdit')
    this.loadingSpinner = true
    console.log('this.local_data',this.local_data)
   
    // const formData = new FormData();
    // if (this.imageCurrent) {      
    //   formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    // } else {      
    //   formData.append('image', ''); 
    // }    
    
    // formData.append('id', this.local_data.id);
    // formData.append('title', this.local_data.title);
    // formData.append('description', this.local_data.description);
    // formData.append('time_study', this.local_data.time_study);
    const body= {
      id: this.local_data.id,
      value: this.local_data.value,
      type_id: this.local_data.type_id,
      bold: this.local_data.bold
    }
    this.dashboardService.updateCourseContentDetail(body).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseContentDetail(this.local_data.course_detail_id).subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
              this.openSnackBar('Update successful', 'success');
              this.dialogRef.close({ event: this.action, data: this.local_data });
             }
            },
            (error: any) => {                 
              this.loadingSpinner = false; 
              console.error('Error fetching courses:', error);             
              this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
            }  
          );          
        }        
      },
      (error: any) => {
        // Case error: handle the error here
        this.openSnackBar(error.error.message, 'error');
        this.loadingSpinner = false;  // Stop spinner if error happens
        console.error('Error fetching courses:', error);
     
        // Optionally show an error message to the user
        this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
      } 
    );
    
  }

  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }


  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  converImage(imagePath: any) {
    const baseUrl = environment.domain
    let cleanedImagePath = null
    // const baseUrl = 'https://elearning-be-h3lj.onrender.com'; 
    // URL cơ sở của bạn
    // Loại bỏ 'uploads' khỏi đường dẫn
  if(imagePath.includes('uploads')){
   
    const format = imagePath.replace('uploads/', ''); 
    cleanedImagePath = `${baseUrl}/${format}`
  }else{

    cleanedImagePath = imagePath;
  }
 
  return cleanedImagePath
  }

  selectFile(event: any): void {
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
    this.imageCurrent = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}


@Component({
  selector: 'dialog-overview',
  standalone: true,
  imports: [ MatDialogActions, 
             MatDialogClose, 
             MatDialogTitle, 
             MatDialogContent, 
             MatButtonModule,
             MatProgressSpinnerModule, 
             MatIconModule, 
             CommonModule
            ],
  templateUrl: 'dialog-overview.component.html',
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5); /* Làm mờ màn hình */
      z-index: 1000; /* Đảm bảo overlay ở trên cùng */
    }
  `],
})
export class AppDialogOverviewComponent {
  private _snackBar = inject(MatSnackBar)
  constructor(
   
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dashboardService: dashboardService,
    
  
  ) {

  }
  public loadingSpinner: boolean = false;

  save(): void {
    console.log('this.data',this.data)
    this.loadingSpinner = true
    console.log('save',this.data)
    const body = {
      id: this.data.id,
    }
    this.dashboardService.deleteCourseContentDetail(body).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseContentDetail(this.data.courseDetailId).subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
              this.openSnackBar('delete successful', 'success');
              this.dialogRef.close();
             }
            }
          );          
        }        
      },
      (error: any) => {
        // Case error: handle the error here
        this.openSnackBar(error.error.message, 'error');
        this.loadingSpinner = false;  // Stop spinner if error happens
        console.error('Error fetching courses:', error);
     
        // Optionally show an error message to the user
        this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
      }   
      
    )
  }

  durationInSeconds = 3;

  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  cancle(): void {
    console.log('cancle')
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

