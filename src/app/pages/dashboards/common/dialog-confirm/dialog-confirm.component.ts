import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule, DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "src/app/material.module";
import { AppDialogOverviewComponent } from "src/app/pages/ui-components/dialog/dialog.component";

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-dialog-confirm',
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
        OverlayModule,
        TablerIconsModule,
    ],
    templateUrl: 'dialog-confirm.component.html',
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
  export class DialogConfirmComponent {
    public loadingSpinner = false;
    constructor(   
        public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,     
      ) { }

      cancle(): void {
        this.dialogRef.close(false);
      }
      save(): void {
        this.dialogRef.close(true)
      }
  }