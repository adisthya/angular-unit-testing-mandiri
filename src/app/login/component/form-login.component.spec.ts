import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { LoginToken } from '../model/login';
import { LoginService } from '../service/login.service';
import { FormLoginComponent } from './form-login.component';

describe('6. FormLoginComponent Dependency Injection Test', () => {
  let fixture: ComponentFixture<FormLoginComponent>;
  let component: FormLoginComponent;
  let loginService: jasmine.SpyObj<LoginService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let location: Location;

  beforeAll(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy }
      ],
    });

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.removeItem('token');
  });

  describe('6.1. Form login submit test scenario', () => {
    it('successful login should return LoginToken class value', async () => {
      const sampleToken: LoginToken = { token: 'justSampleToken' };

      loginService.login.and.returnValue(of(sampleToken));
      component.form.setValue({ username: 'demo', password: 'demo' });

      component.onFormSubmit();
      // fixture.detectChanges();
      // const loginToken: LoginToken = await loginService.login.calls.mostRecent().returnValue.toPromise();

      expect(loginService.login.calls.count()).toBe(1);
      expect(sessionStorage.getItem('token')).toBeTruthy();
      expect(sessionStorage.getItem('token')).toEqual(sampleToken.token);
      // expect(location.path()).toMatch('/');
    });
  });

  describe('6.2. Form login redirections by "action" parameter', () => {
    it('should redirect user to / if action value is "logout"', async () => {
      const action = 'logout';
      const spy = spyOn(activatedRoute.params, 'pipe')
        .and.callThrough()
        .and.callFake(() => of(action) as Observable<any>);

      component.ngOnInit();
      fixture.detectChanges();

      const actualAction = await spy.calls.mostRecent().returnValue.toPromise();

      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
      expect(actualAction).toMatch(action);
      expect(sessionStorage.getItem('token')).toBeFalsy();
      expect(location.path()).toMatch('/');
    });

    it('should redirect user to / if action value is "login" and session token is already set', async () => {
      const action = 'login';
      const spy = spyOn(activatedRoute.params, 'pipe')
          .and.callThrough()
          .and.callFake(() => of(action) as Observable<any>);

      sessionStorage.setItem('token', 'sampleToken');
      component.ngOnInit();
      fixture.detectChanges();

      const actualAction = await spy.calls.mostRecent().returnValue.toPromise();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
      expect(actualAction).toMatch(action);
      expect(location.path()).toMatch('/');
    });
  });
});

describe('7. FormLoginComponent ReactiveForm Test', () => {
  let fixture: ComponentFixture<FormLoginComponent>;
  let component: FormLoginComponent;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [{
        provide: LoginService, useValue: loginServiceSpy
      }]
    });

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  describe('7.1. FormGroup and FormControl should be initialized', () => {
    it('should be successfuly initialized', () => {
      expect(component.form).toBeTruthy();

      expect(component.form.get('username')).toBeDefined();
      expect(component.form.get('username')).toBeInstanceOf(AbstractControl);

      expect(component.form.get('password')).toBeDefined();
      expect(component.form.get('password')).toBeInstanceOf(AbstractControl);
    });
  });

  describe('7.2. Username FormControl should be validated', () => {
    let usernameControl: AbstractControl;

    beforeEach(() => {
      usernameControl = component.form.get('username') as AbstractControl;
    });

    describe('7.2.1. Validation required should be working', () => {
      it('required validator should be truthy if username value is blank', () => {
        usernameControl.setValue('');
        usernameControl.markAsTouched();

        fixture.detectChanges();

        const errors = usernameControl.errors as ValidationErrors;

        expect(errors).toBeTruthy();
        expect(errors['required']).toBeTruthy();

        expect(usernameControl.invalid).toBeTrue();
        expect(component.isFieldValid('username')).toMatch('is-invalid');
      });
    });

    describe('7.2.2. Validation minlength should be working', () => {
      it('minlength should be truthy if username value is "joe"', () => {
        usernameControl.setValue('joe');
        usernameControl.markAsTouched();

        fixture.detectChanges();

        const errors = usernameControl.errors as ValidationErrors;

        expect(errors).toBeTruthy();
        expect(errors['minlength']).toBeTruthy();
        expect(usernameControl.invalid).toBeTrue();
      });
    });
  });

  describe('7.3. Password FormControl should be validated', () => {
    let passwordControl: AbstractControl;

    beforeEach(() => {
      passwordControl = component.form.get('password') as AbstractControl;
    });

    describe('7.2.1. Validation required should be working', () => {
      it('required validator should be truthy if password value is blank', () => {
        passwordControl.setValue('');
        passwordControl.markAsTouched();

        fixture.detectChanges();

        const errors = passwordControl.errors as ValidationErrors;

        expect(errors).toBeTruthy();
        expect(errors['required']).toBeTruthy();

        expect(passwordControl.invalid).toBeTrue();
        expect(component.isFieldValid('password')).toMatch('is-invalid');
      });
    });

    describe('7.2.2. Validation minlength should be working', () => {
      it('minlength should be truthy if password value is "pwd"', () => {
        passwordControl.setValue('pwd');
        passwordControl.markAsTouched();

        fixture.detectChanges();

        const errors = passwordControl.errors as ValidationErrors;

        expect(errors).toBeTruthy();
        expect(errors['minlength']).toBeTruthy();
        expect(passwordControl.invalid).toBeTrue();
      });
    });
  });

  describe('7.4. Form Group should be valid', () => {
    it('form field should be valid if it passes the validators', () => {
      component.form.setValue({ username: 'demo', password: 'demo' });

      expect(component.form.valid).toBeTrue();
      expect(component.isFieldValid('username')).toMatch('is-valid');
      expect(component.isFieldValid('password')).toMatch('is-valid');
    });
  });
});
