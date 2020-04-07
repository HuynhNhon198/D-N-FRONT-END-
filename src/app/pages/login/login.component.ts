import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('ipFocus', { static: false }) ipF: ElementRef;
  validateForm: FormGroup;
  login = true;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.controls;
      this.authSV.signIn(email.value, password.value);
    }
  }

  constructor(
    private fb: FormBuilder,
    public authSV: FirebaseService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.ipF.nativeElement.focus(), 500);
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      remember: [true]
    });
  }

  resetPassword() {
    const email = this.validateForm.controls.email.value;
    if (email) {
      this.authSV.resetPassword(email);
    } else {
      this.helper.createMessage('Vui Lòng Nhập Email', 'warning', 1500);
      setTimeout(() => this.ipF.nativeElement.focus(), 500);
    }
  }
}
