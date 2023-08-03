import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  public loginFormGroup!: FormGroup;
  public registerFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerFormGroup = this.fb.group({
      username: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  checkCredentials() {
    if (this.loginFormGroup.valid) {
      // Check credentials (you can implement this logic according to your needs)
      if (
        this.loginFormGroup.get('username')?.value ===
          sessionStorage.getItem('username') &&
        this.loginFormGroup.get('password')?.value ===
          sessionStorage.getItem('password')
      ) {
        alert('Login successful!');
        this.authService.login();
      } else {
        alert('Invalid credentials!');
      }
    }
  }

  register() {
    // Save registration data to session storage
    sessionStorage.setItem(
      'username',
      this.registerFormGroup.get('username')?.value
    );
    sessionStorage.setItem('email', this.registerFormGroup.get('email')?.value);
    sessionStorage.setItem(
      'password',
      this.registerFormGroup.get('password')?.value
    );
    sessionStorage.setItem(
      'confirmPassword',
      this.registerFormGroup.get('confirmPassword')?.value
    );
    alert('Registration successful!');
    this.registerFormGroup.reset();
  }

  get email() {
    return this.loginFormGroup.get('email');
  }
}
