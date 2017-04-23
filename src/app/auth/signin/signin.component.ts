import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  //emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  emailErrorMsg = '';
  passwordErrorMsg = '';
  loginErrorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onSignIn() {
    let email = this.signinForm.controls.email;
    let password = this.signinForm.controls.password;

    this.loginErrorMessage = '';

    if (!this.signinForm.valid) {
      this.emailErrorMsg = '';
      if (!email.valid && email.errors.required) {
        this.emailErrorMsg = 'Enter your email';
      }

      if (!email.valid && email.errors.email) {
        this.emailErrorMsg = 'Enter a valid email address';
      }

      this.passwordErrorMsg = '';
      if (!password.valid && password.errors.required) {
        this.passwordErrorMsg = 'Enter your password';
      }
    } else {
      // try to singin
      this.emailErrorMsg = '';
      this.passwordErrorMsg = '';

      this.authService.login(email.value, password.value)
        .then(
        (val) => this.router.navigate(['/search'])
        ,
        (e) => this.loginErrorMessage = e
        )
        .catch(
        e => alert(e)
        );
    }
  }
}
