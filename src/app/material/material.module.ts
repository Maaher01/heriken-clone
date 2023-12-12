import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

const components = [
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, components],
  exports: [components],
})
export class MaterialModule {}
