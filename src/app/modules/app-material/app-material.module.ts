import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatMenuModule,
  MatInputModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMenuModule,
    MatInputModule
  ]
})
export class AppMaterialModule { }
