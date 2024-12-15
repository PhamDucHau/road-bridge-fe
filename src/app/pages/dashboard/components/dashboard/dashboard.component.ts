import { Component, inject, Inject, Optional, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { dashboardService } from '../../dashboard.service';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CourseListModel } from '../../model/course-list.model';
import { Observable, Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ApplyUserComponent } from '../apply-user/apply-user.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/app/config/environments/environment';
// import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatDividerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,   
    OverlayModule,
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {  
  title: any;
  blogDetail: any = null;

  istoggleReply = true;
  private subscription!: Subscription;
  protected sourceList$!: Observable<any | null>;
  public loadingSpinner = false;
  dataSource = new MatTableDataSource<any>();
  protected pageSizeOptions: any[] = [];
  protected totalRecord$!: Observable<number | null>;
  protected pageIndex!: number;
  protected pageSize!: number;
  protected filter: any = {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

  toggleReply() {
    this.istoggleReply = !this.istoggleReply;
  }
  activeRoute: any = this.router.url.split('/').pop();

  constructor(
    public router: Router,
    activatedRouter: ActivatedRoute,
    public dashboardService: dashboardService,
    public dialog: MatDialog,
    
    // private datePipe: DatePipe
  ) {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log('this.dataSource', this.dataSource)
    
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

  selectCourse(b: string) {
   
    this.dashboardService.detailId = b;
    // this.router.navigate(['dashboard/dashboardDetail', b]);
    this.router.navigate(['dashboard',b]);
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

  

  ngOnInit(): void {
    console.log('isButtonPermission', this.isButtonPermission());
    console.log('paginator', this.paginator)
    
    this.loadingSpinner = true;
    this.pageSizeOptions = [5, 10, 20, 50, 100, 200]
    this.pageIndex = 0
    this.pageSize = 5
    this.filter = {
      page: this.pageIndex + 1,
      size: this.pageSize,
      search: ''
    }
    this.totalRecord$ = this.dashboardService.totalRecord$;
    if (this.dashboardService.blogPosts.length === 0) {
      this.dashboardService
        .getBlog()
        .subscribe((d: any) => (this.dashboardService.blogPosts = d));
    }

    this.sourceList$ = this.dashboardService.sourceList$; 
    this.subscription = this.dashboardService.getAllCourse(this.filter).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
   
  }

  isButtonPermission(): boolean {
    const role = JSON.parse(localStorage.getItem('role') || '[]');
    return ['Admin', 'Teacher'].some(r => role.includes(r));
  }
  applyFilter(filterValue: string): void {
    this.filter.search = filterValue
    this.subscription = this.dashboardService.getAllCourse(this.filter).subscribe(
      (res: any) => {
        if(res){         
        }
      }
    )
    console.log('this.filter', this.filter)
  }

  ngOnDestroy(): void {   
    if (this.subscription) {      
      this.subscription.unsubscribe();
    }
  } 

  handlePageEvent(e: PageEvent) {

    console.log('e', e)
    this.loadingSpinner = true;
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize
    this.filter = {
      page: this.pageIndex + 1,
      size: this.pageSize,
      search: ''
    }
    this.subscription = this.dashboardService.getAllCourse(this.filter).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    )
    //set thong tin paging xuong share data.... hệ thống sẽ tự reload list
    // this.userService.setItemsPerPage(e.pageSize);
    // this.userService.setCurrentPage(e.pageIndex);
    // this.userService.pushState();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDialogCourseComponent, {
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

  openApllyDialog(obj: any): void {
    this.dialog.open(ApplyUserComponent, {
      data: obj,
    });
  }
}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-coures',
  standalone: true,
  imports: [
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule, 
    MatDividerModule, 
    MatIconModule,
    TablerIconsModule,
    OverlayModule
  ],
  templateUrl: 'add-dialog-course.html',
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
export class AppDialogCourseComponent {
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
    public dialogRef: MatDialogRef<AppDialogCourseComponent>,
    public dashboardService: dashboardService,
    
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.image === undefined) {
      this.local_data.image = '';
    }
  }

  ngOnInit(): void {}  

  saveCreate(): void {
    this.loadingSpinner = true
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {      
      formData.append('image', this.local_data.image); 
    }    
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    formData.append('status', this.local_data.status);
    formData.append('price', this.local_data.price);
    formData.append('old_price', this.local_data.old_price);
    formData.append('star', this.local_data.star);
    // Log the contents of FormData
    this.dashboardService.createCourse(formData).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourse().subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
              this.openSnackBar('Update successful', 'success');
              this.dialogRef.close({ event: this.action, data: this.local_data });
             }
            },
            (error: any) => {
              // Case error: handle the error here
              this.openSnackBar(error.error.message, 'error');
              this.loadingSpinner = false;  // Stop spinner if error happens
             
              // Optionally show an error message to the user
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
    this.loadingSpinner = true
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {      
      formData.append('image', this.local_data.image);       
    } 
    formData.append('id', this.local_data.id);
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    formData.append('status', this.local_data.status);
    formData.append('price', this.local_data.price);
    formData.append('old_price', this.local_data.old_price);
    formData.append('star', this.local_data.star);   
    this.dashboardService.updateCourse(formData).subscribe(
        (res: any) => {        
          if (res) {
            this.dashboardService.getAllCourse().subscribe(
              (res: any) => {
               if(res){
                this.loadingSpinner = false;
                this.openSnackBar('Update successful', 'success');
                this.dialogRef.close({ event: this.action, data: this.local_data });
               }
              },
              (error: any) => {
                // Case error: handle the error here
                
                this.loadingSpinner = false;  // Stop spinner if error happens
                console.error('Error fetching courses:', error);
                // Optionally show an error message to the user
                this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
              }   
            )
                   
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
      this.local_data.image = reader.result;
    };
  }
}




@Component({
  selector: 'dialog-overview',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent, 
    MatButtonModule,
    MatProgressSpinnerModule, 
    MatIconModule, 
    CommonModule, 
    MatDividerModule,
    OverlayModule
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
  `]
})
export class AppDialogOverviewComponent {
  private _snackBar = inject(MatSnackBar)
  constructor(
   
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dashboardService: dashboardService,   
  
  ) { }
  public loadingSpinner: boolean = false;
  save(): void {
    this.loadingSpinner = true
    console.log('save',this.data)
    const body = {
      id: this.data.id,
    }
    this.dashboardService.deleteCourse(body).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourse().subscribe(
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



