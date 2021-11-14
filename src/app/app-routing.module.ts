import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './intro/component/intro-page.component';
import { FormLoginComponent } from './login/component/form-login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IntroPageComponent,
  },
  {
    path: 'auth/:action',
    component: FormLoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
