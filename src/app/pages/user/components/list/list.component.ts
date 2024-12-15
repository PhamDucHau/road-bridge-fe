





import {
  Component,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
  inject,
  signal,
} from '@angular/core';
import {
  MatTableDataSource,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
// import { AppAddKichenSinkComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from '../../user.service';
import { Observable, Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/app/config/environments/environment';





@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
    OverlayModule
  ],
  providers: [DatePipe],
})
export class ListComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#', 
    'name',
    'email',
    'password',
    'mobile',
    'gender',
    'date_of_birth', 
    'action',
  ];
  private subscription!: Subscription;
  protected userList$!: Observable<any | null>;
  dataSource = new MatTableDataSource<any>();
  protected pageSizeOptions: any[] = [];
  protected totalRecord$!: Observable<number | null>;
  protected pageIndex!: number;
  protected pageSize!: number;
  protected filter: any = {}
  public loadingSpinner = false;

  
  

 
  
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  

  constructor(public dialog: MatDialog, public datePipe: DatePipe, private userService: UserService) {}

  exportData(): void {
    this.userList$.subscribe((res: any) => {
      if(res){
        
        this.userService.exportAsExcelFile(res, 'List_User');
      }
    }).unsubscribe()
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    this.pageSizeOptions = [5, 10, 20, 50, 100, 200]
    this.pageIndex = 0
    this.pageSize = 10
    this.filter = {
      page: this.pageIndex + 1,
      size: this.pageSize,
      search: ''
    }

    this.totalRecord$ = this.userService.totalRecord$;
   
    this.userList$ = this.userService.userList$;
    this.subscription = this.userService.getUserList(this.filter).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    )
    this.userList$.subscribe(users => {
      this.dataSource.data = users;
    });
    
  }

  ngOnDestroy(): void {
    if(this.subscription){
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
    this.subscription = this.userService.getUserList(this.filter).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    )
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


  applyFilter(filterValue: string): void {
    
    this.filter.search = filterValue
    this.subscription = this.userService.getUserList(this.filter).subscribe(
      (res: any) => {
        if(res){         
        }
      }
    )
    console.log('this.filter', this.filter)
   
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDialogUserComponent, {
      data: obj,
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result.event === 'Add') {
    //     this.addRowData(result.data);
    //   } else if (result.event === 'Update') {
    //     this.updateRowData(result.data);
    //   } else if (result.event === 'Delete') {
    //     this.deleteRowData(result.data);
    //   }
    // });
  }

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: any): void {
   
    // this.dialog.open(AppAddKichenSinkComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: any): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: any): boolean | any {
    
  }
}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-user',
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
  templateUrl: 'dialog-user.html',
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
export class AppDialogUserComponent {
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
    public dialogRef: MatDialogRef<AppDialogUserComponent>,
    private userService: UserService,
    
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

  listRole: any[] = [];

  ngOnInit(): void {
    console.log('this', this.action)
   
    this.userService.getListRoleByUserId(this.local_data.id).subscribe((res: any) => {
      if(res){
        this.listRole = res.data
        if(this.action == 'Update'){
          const listRole = res.data.map((item: any) => item.id)
          this.local_data.role_id = listRole
        }
       
      }
    })
  }  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  saveCreate(): void {   
   this.loadingSpinner = true
   const body = {
    name_user: this.local_data.name_user,
    email: this.local_data.email,
    password: this.local_data.password,
    gender: this.local_data.gender,
    date_of_birth: this.local_data.date_of_birth,
    mobie: this.local_data.mobie,
    role_id: this.local_data.role_id
   }   
   this.userService.createUser(body).subscribe((res: any) => {
    if(res){
      this.userService.getUserList().subscribe((res: any) => {
        if(res){
          this.loadingSpinner = false
          this.openSnackBar('Update successful', 'success');
          this.dialogRef.close({ event: this.action, data: this.local_data });
        }
      })
    }
   },
   (error: any) => {
    this.loadingSpinner = false
    this.openSnackBar(error.error.message, 'error');
   }
  )
   
    
  }

  saveEdit(): void {    
    this.loadingSpinner = true
   const body = {
    id: this.local_data.id,
    name_user: this.local_data.name_user,
    email: this.local_data.email,
    password: this.local_data.password,
    gender: this.local_data.gender,
    date_of_birth: this.local_data.date_of_birth,
    mobie: this.local_data.mobie,
    role_id: this.local_data.role_id
   }   
   this.userService.updateUser(body).subscribe((res: any) => {
    if(res){
      this.userService.getUserList().subscribe((res: any) => {
        if(res){
          this.loadingSpinner = false
          this.openSnackBar('Update successful', 'success');
          this.dialogRef.close({ event: this.action, data: this.local_data });
        }
      })
    }
   },
   (error: any) => {
    this.loadingSpinner = false
    this.openSnackBar(error.error.message, 'error');
   }
  )
    
  }

  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status }
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
    private userService: UserService,   
  
  ) { }
  public loadingSpinner: boolean = false;
  save(): void {
    this.loadingSpinner = true
    console.log('save',this.data)
    const body = {
      id: this.data.id,
    }
    this.userService.deleteUser(body).subscribe(
      (res: any) => {        
        if (res) {
          this.userService.getUserList().subscribe(
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



