import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginToken } from '../model/login';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)])
  });

  constructor(
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,
      private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(map((params: any) => params.action))
        .subscribe((action) => {
          if (action === 'logout') {
            sessionStorage.removeItem('token');
            this.router.navigateByUrl('/').finally();
          }
          else if (sessionStorage.getItem('token') && action === 'login') {
            this.router.navigateByUrl('/').finally();
          }
        });
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value)
          .subscribe((response: LoginToken) => {
            sessionStorage.setItem('token', response.token);
            this.router.navigateByUrl('/').finally();
          }, console.error);
    }
  }

  isFieldValid(fieldName: string): string {
    const control: AbstractControl = this.form.get(fieldName) as AbstractControl;

    if (control && control.invalid && control.touched) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }
}
