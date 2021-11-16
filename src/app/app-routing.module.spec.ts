import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule Unit Testing', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule
      ],
    });

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should navigate to "/", when router navigate is directed to "/"', async () => {
    await router.navigate(['/']);

    expect(location.path()).toMatch('/');
  });

  it('should navigate to "/auth/login", when router navigate is directed to "/auth/login"', async () => {
    await router.navigate(['/auth/login']);

    expect(location.path()).toMatch('/auth/login');
  });

  it('should navigate to "/auth/logout", when router navigate is directed to "/auth/logout"', async () => {
    await router.navigateByUrl('/auth/logout');

    expect(location.path()).toMatch('/auth/logout');
  });
});
