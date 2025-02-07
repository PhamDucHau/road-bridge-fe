import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EgretCalendarEvent } from './event.model';
import { CommonModule } from '@angular/common';
import { FALSE } from 'sass';

interface DialogData {
  event?: CalendarEvent;
  action?: string;
  date?: Date;
}

@Component({
  selector: 'app-calendar-form-dialog',
  templateUrl: './calendar-form-dialog.component.html',
  styleUrls: ['./calendar-form-dialog.component.scss'],
  standalone: true,
  imports: [
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDatepickerModule, 
    CommonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFormDialogComponent {
  event: any;
  dialogTitle: string;
  eventForm: UntypedFormGroup;
  action: any;
  constructor(
    public dialogRef: MatDialogRef<CalendarFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: UntypedFormBuilder
  ) {
    this.event = data.event;
    this.action = data.action;

    // this.dialogTitle = 'Add Event';
   
      this.event = new EgretCalendarEvent({
        start: data.date,
        end: data.date,
      });

    // console.log(data);
    this.eventForm = this.buildEventForm(this.event);
  }

  buildEventForm(event: any): any {
    return new UntypedFormGroup({
      _id: new UntypedFormControl(event._id),
      title: new UntypedFormControl(event.title),
      start: new UntypedFormControl(event.start),
      end: new UntypedFormControl(event.end),
      year: new UntypedFormControl(event.year),
      quy: new UntypedFormControl(event.quy),
      allDay: new UntypedFormControl(event.allDay),
      color: this.formBuilder.group({
        primary: new UntypedFormControl(event.color.primary),
        secondary: new UntypedFormControl(event.color.secondary),
      }),
      meta: this.formBuilder.group({
        location: new UntypedFormControl(event.meta.location),
        notes: new UntypedFormControl(event.meta.notes),
      }),
      draggable: new UntypedFormControl(true),
    });
  }

  isValid() {
    
    if (this.eventForm.value.start && this.eventForm.value.end && this.action === 'filterTime') {
      
      return true
    } 
    if (this.eventForm.value.year && this.eventForm.value.quy && this.action === 'filterQuy') {
      
      return true
    }
    return false
  }
  ngOnInit(): void {
    console.log('this.eventForm', this.eventForm.value);
  }
}
