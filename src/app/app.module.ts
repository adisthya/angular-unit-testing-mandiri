import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './login/component/form-login.component';
import { LoginService } from './login/service/login.service';
import { IntroPageComponent } from './intro/component/intro-page.component';
import { BsButtonDirective } from './shared/directives/bs-button.directive';
import { HighlightDirective } from './shared/directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    IntroPageComponent,
    BsButtonDirective,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ LoginService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
