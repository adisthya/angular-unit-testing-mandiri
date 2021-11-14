import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css']
})
export class IntroPageComponent {
  title: string = 'angular-unit-testing';
  loginToken: string = sessionStorage.getItem('token') as string;
}
