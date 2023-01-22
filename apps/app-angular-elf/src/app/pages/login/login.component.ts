import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../shared/user-data/user-data.service';

@Component({
  selector: 'rw-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  onSignIn() {
    if (this.form.invalid) {
      return;
    }

    this.userDataService
      .login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
