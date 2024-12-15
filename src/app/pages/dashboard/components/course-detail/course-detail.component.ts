import { Component, inject, Inject, Optional } from '@angular/core';


// import { Component } from '@angular/core';
// import { CourseService } from './course.service';
// import { course } from './course';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { dashboardService } from '../../dashboard.service';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { A } from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';
import { environment } from 'src/app/config/environments/environment';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    MatCardModule,
    TablerIconsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule, MatIconModule,
    OverlayModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})

export class CourseDetailComponent {
  courseList: any[] = [];
  selectedCategory = 'All';
  course_id = this.route.snapshot.paramMap.get('id')!;
  sourceDetailList$: Observable<any> | undefined;
  private subscription!: Subscription;
  public loadingSpinner = false;
  private _snackBar = inject(MatSnackBar)

  constructor(
    private courseService: dashboardService,  
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseList = this.courseService.getCourse();
  }

  ngOnInit(): void {   
    this.loadingSpinner = true;
    this.sourceDetailList$ = this.courseService.sourceDetailList$;
    this.subscription = this.courseService.getAllCourseDetail(this.course_id).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      },
      (error: any) => {
        // Case error: handle the error here
        this.openSnackBar(error.error.message, 'error');
        this.loadingSpinner = false;  // Stop spinner if error happens
        console.error('Error fetching courses:', error);
     
        // Optionally show an error message to the user
        // this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
      } 
      
    )
    console.log('this.sourceDetailList$',this.sourceDetailList$)
   
  }
  isButtonPermission(): boolean {
    const role = JSON.parse(localStorage.getItem('role') || '[]');
    return ['Admin', 'Teacher'].some(r => role.includes(r));
  }

  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  openDialogRemove(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    this.dialog.open(AppDialogOverviewComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
      data
      
    });
  }

  goPage(courseDetailId: string) {
    localStorage.removeItem('courseId'); 
    localStorage.setItem('courseId', this.course_id);
    this.router.navigate(['/dashboard/course-content-detail', courseDetailId]);
  }

  goToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

  ngOnDestroy(): void {
    // localStorage.removeItem('courseId'); 
    // localStorage.setItem('courseId', this.course_id);
   
    if (this.subscription) {
      
      this.subscription.unsubscribe();
    }
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courseList = this.filter(filterValue);
  }

  filter(v: string): any {
    return this.courseService
      .getCourse()
      .filter(
        (x) => x.courseName.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
  }

  ddlChange(ob: any): void {
    const filterValue = ob.value;
    if (filterValue === 'All') {
      this.courseList = this.courseService.getCourse();
    } else {
      this.courseList = this.courseService
        .getCourse()
        // tslint:disable-next-line: no-shadowed-variable
        .filter((course) => course.courseFramework === filterValue);
    }
  }

  openDialog(action: string, obj: any): void {
    
    obj.action = action;
    obj.course_id = this.course_id;
    const dialogRef = this.dialog.open(AppDialogCourseDetailComponent, {
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
  selector: 'add-dialog-course-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, OverlayModule, TablerIconsModule],
  templateUrl: 'add-dialog-course-detail.html',
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
export class AppDialogCourseDetailComponent {
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
    public dialogRef: MatDialogRef<AppDialogCourseDetailComponent>,
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
   
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {      
      formData.append('image', ''); 
    }    
    formData.append('course_id', this.local_data.course_id);
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    this.dashboardService.createCourseDetail(formData).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseDetail(this.local_data.course_id).subscribe(
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
   
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {      
      formData.append('image', ''); 
    }    
    
    formData.append('id', this.local_data.id);
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    this.dashboardService.updateCourseDetail(formData).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseDetail(this.local_data.course_id).subscribe(
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
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule,MatProgressSpinnerModule, MatIconModule, CommonModule, OverlayModule],
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
    this.loadingSpinner = true
    console.log('save',this.data)
    const body = {
      id: this.data.id,
    }
    this.dashboardService.deleteCourseDetail(body).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourseDetail(this.data.course_id).subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
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




