import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  emailPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  emailErrorMsg = '';
  passwordErrorMsg = '';
  passwordConfirmErrorMsg = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, { validator: (formGroup: FormGroup) => this.passwordMatch(formGroup) });

  }

  onSignup() {

    let email = this.signupForm.controls.email;
    let password = this.signupForm.controls.password;
    let passwordConfirm = this.signupForm.controls.passwordConfirm;

    if (!this.signupForm.valid) {
      this.emailErrorMsg = '';
      this.passwordErrorMsg = '';
      this.passwordConfirmErrorMsg = '';

      if (!email.valid && email.errors.required) {
        this.emailErrorMsg = 'Enter your email';
      }

      if (!email.valid && email.errors.pattern) {
        this.emailErrorMsg = 'Enter a valid email address';
      }

      if (!password.valid && password.errors.required) {
        this.passwordErrorMsg = 'Enter your password';
      }

      if (!passwordConfirm.valid && passwordConfirm.errors.required) {
        this.passwordConfirmErrorMsg = 'Type your password again';
      }

      if (this.signupForm.errors && this.signupForm.errors.passwordMismatch) {
        this.passwordConfirmErrorMsg = 'Passwords must match';
      }
    } else {

      this.emailErrorMsg = '';
      this.passwordErrorMsg = '';
      this.passwordConfirmErrorMsg = '';

      //check if user exists
      this.authService.isUserExists(email.value)
        .then(
        // go save user to localstorage and navigate to search page
        val => {
          this.authService.saveAndLoginUser(email.value, password.value);
          this.router.navigate(['/search']);
        }
        ,
        // user exists
        e => this.emailErrorMsg = e
        )
        .catch(
        e => alert(e)
        );
    }
  }

  private passwordMatch(formGroup: FormGroup): { [s: string]: boolean } {
    if (formGroup.controls.password.value !== formGroup.controls.passwordConfirm.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

}
