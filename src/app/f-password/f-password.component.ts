import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../components/login/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.css'],
})
export class FPasswordComponent {
  mailSent: boolean;
  isProgressVisible: boolean;
  forgotPasswordForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.mailSent = false;
    this.isProgressVisible = false;

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {}

  retrievePassword() {
    this.isProgressVisible = true; // show the progress indicator as we start the Firebase password reset process

    if (this.forgotPasswordForm.invalid) return;

    this.authService
      .resetPassword(this.forgotPasswordForm.value.email)
      .then((result) => {
        this.isProgressVisible = false; // no matter what, when the auth service returns, we hide the progress indicator
        if (result == null) {
          // null is success, false means there was an error
          console.log('password reset email sent...');
          this.mailSent = true;
          // this.router.navigate(['/dashboard']);        // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
