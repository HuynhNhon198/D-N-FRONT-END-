import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: {
    displayName: string;
    email: string;
    photoURL: string;
  };
  constructor(
    private authSV: AngularFireAuth,
    private router: Router,
    private helper: HelperService
  ) {
    // listen auth state
    authSV.auth.onAuthStateChanged(user => {
      console.log(user);
      if (user !== null) {
        if (user.emailVerified) {
          router.navigate(['welcome']);
        }
      } else {
        router.navigate(['login']);
      }
    });
  }

  // Login to web with google plus method
  async googleLogin(): Promise<void> {
    await this.authSV.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  // SignIn to web with email, password
  async signIn(email: string, password: string) {
    this.helper.createLoadingMessage('ĐANG ĐĂNG NHẬP...');
    const r = await this.authSV.auth.signInWithEmailAndPassword(email, password).catch(err => {
      let text = 'Có Lỗi Xảy Ra, Vui lòng kiểm tra lại hoặc liên hệ quản trị viên.';
      switch (err.code) {
        case 'auth/user-not-found':
          text = 'Email bạn nhập không tồn tại trên hệ thống!';
          break;
        case 'auth/wrong-password':
          text = 'Sai mật khẩu!';
          break;
        default:
          break;
      }
      console.log(err);
      this.helper.createLoadingMessage('', true);
      this.helper.createMessage(text, 'error', 3000);
    });
    if (r) {
      this.helper.createLoadingMessage('', true);
      if (!r.user.emailVerified) {
        this.helper.createMessage('Tài Khoản Của Bạn Chưa Được Xác Thực, Vui Lòng Kiểm Tra Email', 'warning');
      } else {
        this.router.navigate(['welcome']);
      }
    }
  }

  // signup to web with email password
  async register(name: string, email: string, password: string) {
    this.helper.createLoadingMessage('ĐANG ĐĂNG KÍ TÀI KHOẢN...');
    const result = await this.authSV.auth.createUserWithEmailAndPassword(email, password).catch(err => {
      this.helper.createLoadingMessage('', true);
      this.helper.createMessage('LỖI: ' + err.code, 'error', 3000);
    });
    if (result) {
      this.helper.createLoadingMessage('', true);
      this.helper.createMessage('Tạo Tài Khoản Thành Công', 'success');
      await this.authSV.auth.currentUser.sendEmailVerification();
      this.helper.createMessage('Vui Lòng Kiểm Tra Email Để Xác Thực Tài Khoản', 'warning', 3000);
      setTimeout(() => location.reload(), 2500);
    }
  }

  // Reset password
  async resetPassword(email: string) {
    await this.authSV.auth.sendPasswordResetEmail(email).catch(err => {
      let text = 'Có Lỗi Xảy Ra, Vui lòng kiểm tra lại hoặc liên hệ quản trị viên.';
      switch (err.code) {
        case 'auth/user-not-found':
          text = 'Email bạn nhập không tồn tại trên hệ thống!';
          break;
        default:
          break;
      }
      this.helper.createMessage(text, 'error', 3000);
    });
    this.helper.createMessage(`Vui Lòng Kiểm Tra Email: ${email} Để Đặt Lại Mật Khẩu`, 'warning');
  }

}
