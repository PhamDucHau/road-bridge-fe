import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "src/app/material.module";
import { TechnicalSupportService } from "./technical-support.service";
import { forkJoin } from "rxjs";
import { OverlayModule } from "@angular/cdk/overlay";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-technical-support',
  standalone: true,
  imports: [MaterialModule, MatFormFieldModule, TablerIconsModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatDatepickerModule, CommonModule,
    OverlayModule
  ],
  templateUrl: './technical-support.component.html',
  styleUrls: ['./technical-support.component.scss'],
})
export class AppTechnicalSupportComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private service: TechnicalSupportService,
    private route: ActivatedRoute, // inject route ở đây
    private router: Router
  ) { }
  
  
  imageFiles: File[] = [];        // chứa file gốc để gửi lên server
  imagePreviews: string[] = [];  // chứa base64 để hiển thị preview
  public loadingSpinner = false;
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 3;
  lastSegment: string = '';
  
  ngOnInit(): void {

    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter(s => s); // loại bỏ khoảng trắng và khoảng trống
    this.lastSegment = segments[segments.length - 1];
    console.log('Segment cuối cùng:', this.lastSegment);


    this.form = this.fb.group({
      summary: ['', Validators.required],
      description: ['', Validators.required],
      // requester: [''],
      // attachment: [''],
      labels: ['', Validators.required],
      priority: ['', Validators.required],
      projectKey: [''],
      issuetype: ['']
    });
  }
  
  openSnackBar(data: any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status }, // Truyền dữ liệu
    });
  }

  onSubmit() {
    if (this.lastSegment === 'technical-support') {
      this.form.patchValue({
        projectKey: 'TEAM',
        issuetype: 'Bug'
      });
    }

    if (this.lastSegment === 'system-change') {
      this.form.patchValue({
        projectKey: 'TEAM',
        issuetype: 'Task'
      });
    }
    if (this.form.valid) {
      this.loadingSpinner = true     
      
      this.service.saveReport(this.form.value).subscribe(
        (res: any) => {
          const issueKey = res.key || res.id;
  
          // Tạo mảng các observable uploadAttachment
          const uploadObservables = this.imageFiles.map((file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            return this.service.uploadAttachment(issueKey, formData);
          });
  
          // forkJoin đợi tất cả observable hoàn thành
          forkJoin(uploadObservables).subscribe({
            next: (uploadResults) => {
              console.log('All uploads completed:', uploadResults);
              this.form.reset();
              this.imageFiles = [];
              this.imagePreviews = [];
              this.loadingSpinner = false
              this.openSnackBar('Report submitted successfully', 'success');
            },
            error: (err) => {
              console.error('Error in uploading attachments:', err);
            },
          });
        },
        (error) => console.error(error)
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
  
  
  

  
  selectFile(event: any): void {
    const files: FileList = event.target.files;
  
    this.imagePreviews = [];
    this.imageFiles = []; // reset danh sách file
  
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.imageFiles.push(file); // Lưu lại file gốc để gửi FormData
  
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreviews.push(e.target.result); // base64 để hiển thị preview
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectFile({ target: { files } }); // reuse selectFile logic
    }
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