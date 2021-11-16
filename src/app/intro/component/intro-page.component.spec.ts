// fungsi untuk mengkonversi rgb value ke hex value color code.
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BsButtonDirective } from '../../shared/directives/bs-button.directive';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { IntroPageComponent } from './intro-page.component';

const rgb2hex = (rgb: any) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map((n: any) => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

describe('5. IntroPageComponent test scenario', () => {
  let fixture: ComponentFixture<IntroPageComponent>;
  let component: IntroPageComponent;
  let element: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroPageComponent, HighlightDirective, BsButtonDirective ],
      imports: [ CommonModule ],
    });

    fixture = TestBed.createComponent(IntroPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;

    sessionStorage.removeItem('token');
    fixture.detectChanges();
  });

  describe('5.1. Component should be initialized', () => {
    it('component instance should be created', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(IntroPageComponent);
    });

    it('component view element should be created', () => {
      expect(element).toBeTruthy();
      // expect(debugElement).toBeTruthy();
    });
  });

  describe('5.2. Component should have required properties and tags', () => {
    const expectedTitle = 'angular-unit-testing';

    it(`title should have value as ${expectedTitle}`, () => {
      expect(component.title).toMatch(expectedTitle);
    });

    it('token should not have any value if not yet logged-in', () => {
      const token = sessionStorage.getItem('token');

      expect(token).toBeFalsy();
      expect(component.loginToken).toBeFalsy();
    });

    it(`intro application title should contain value as ${expectedTitle}`, () => {
      const title = element.querySelector('.content > .highlight-card > span') as HTMLElement;

      expect(title).toBeTruthy();
      expect(title.textContent).toContain(component.title);
    });
  });

  describe('5.3. Highlight directive should be applied', () => {
    it('should have applied to 1 element', () => {
      const elements = debugElement.queryAll(By.directive(HighlightDirective));
      const element = debugElement.query(By.directive(HighlightDirective));

      expect(elements.length).toBe(1);
      expect(Object.keys(element.classes)).toContain('highlight-card');
    });

    it('should apply background color "#dd0031" to target element', () => {
      const dHighlight = debugElement.query(By.directive(HighlightDirective));
      const highlight = dHighlight.nativeElement;
      const expectedColor = '#dd0031';
      const mouseenter = new Event('mouseenter');

      expect(highlight).toBeTruthy();

      highlight.dispatchEvent(mouseenter);
      fixture.detectChanges();

      console.log(highlight.style.backgroundColor);
      expect(rgb2hex(highlight.style.backgroundColor)).toMatch(expectedColor);
    });
  });

  describe('5.4. BsButton directive should be applied', () => {
    it('should have applied to 2 elements', () => {
      const buttons = debugElement.queryAll(By.directive(BsButtonDirective));
      expect(buttons.length).toBe(2);
    });

    it('target elements should have class btn-link', () => {
      const buttons = debugElement.queryAll(By.directive(BsButtonDirective));

      buttons.forEach((element: DebugElement) => {
        expect(Object.keys(element.classes)).toContain('btn-link');
      });
    });
  });

  describe('5.5 TitleCasePipe should works', () => {
    it('"angular unit test" should have changed to "Angular Unit Test"',  () => {
      const titleUppercase = 'angular unit test';
      const titleCase: TitleCasePipe = new TitleCasePipe();

      expect(titleCase.transform(titleUppercase)).toEqual('Angular Unit Test');
    });
  });
});
