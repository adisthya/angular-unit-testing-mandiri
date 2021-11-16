import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observer } from 'rxjs';
import { Login, LoginToken } from '../model/login';
import { LoginService } from './login.service';

describe('8. LoginService with HTTP Client Unit Testing', () => {
  let authService: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    authService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('8.1. Method login should return LoginToken', () => {
    it('should make POST request and return response LoginToken', async () => {
      const url = '/api/auth/login';
      const expectedCredential: Login = { username: 'demo', password: 'demo' };
      const expectedResponse: LoginToken = { token: 'sampleToken' };

      authService.login(expectedCredential)
          .subscribe((actualResponse) => {
            expect(actualResponse).toEqual(expectedResponse);
          });

      // const actualResponse = await authService.login(expectedCredential).toPromise();
      const { request }: TestRequest = httpMock.expectOne(url);

      expect(request.method).toMatch('POST');
      expect(request.url).toMatch(url);
      expect(request.body).toEqual(expectedCredential);
      // expect(actualResponse).toEqual(expectedResponse);
    });
  });

  it('8.2. should make POST request and return response error when invalid credential is sent', async () => {
    const url = '/api/auth/login';
    const expectedCredential: Login = { username: 'demo', password: 'demo1' };
    const expectedResponse = { statusCode: 401, message: 'Kok username dan/atau password-nya salah?' };
    let actualResponse: any;
    let actualErrorResponse: any;

    const observer: Observer<LoginToken> = {
      next: (response: LoginToken) => actualResponse = response,
      error: (error: HttpErrorResponse) => actualErrorResponse = error.error,
      complete: () => {},
    };

    authService.login(expectedCredential)
        .subscribe(observer);

    // const actualResponse = await authService.login(expectedCredential).toPromise();
    httpMock.expectOne(url)
        .flush(
            expectedResponse,
            { status: expectedResponse.statusCode, statusText: 'Unauthorized' }
        );

    expect(actualErrorResponse).toEqual(expectedResponse);
  });
});
