import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditInfoComponent } from '../edit-info/edit-info.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  public currentUser: any;
  user: any;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  openEditDialog(user: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      heading: 'Edit User',
      user: user,
    };

    this.dialog.open(EditInfoComponent, dialogConfig);
  }
}
