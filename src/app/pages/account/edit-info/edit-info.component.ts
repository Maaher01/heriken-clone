import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  heading: string;
  errorResponse: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editUserForm = this.fb.group({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl('', Validators.email),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.editUserForm.patchValue({
      fullName: this.data.user.fullName,
      phoneNo: this.data.user.phoneNo,
      email: this.data.user.email,
      address: this.data.user.address,
      gender: this.data.user.gender,
    });
  }

  editAdmin(id: any) {
    const payload = {
      fullName: this.editUserForm.controls['fullName'].value!,
      phoneNo: this.editUserForm.controls['phoneNo'].value!,
      email: this.editUserForm.controls['email'].value!,
      address: this.editUserForm.controls['address'].value!,
      gender: this.editUserForm.controls['gender'].value!,
    };
    this.userService.editUserById(id, payload).subscribe({
      next: () => {
        this.closeDialog();
        window.location.reload();
      },
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
