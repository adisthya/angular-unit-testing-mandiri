import { Directive, HostBinding, Input } from '@angular/core';

enum btnColor {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info',
  light = 'btn-light',
  link = 'btn-link'
}

enum btnSize {
  lg = 'btn-lg',
  md = '',
  sm = 'btn-sm'
}

@Directive({
  selector: '[appBsButton]'
})
export class BsButtonDirective {

  @Input() color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'link' = 'primary'
  @Input() size: 'lg' | 'md' | 'sm' = 'md'

  @HostBinding('class')
  get appStyles(): string {
    const buttonColor = btnColor[this.color];
    const buttonSize = btnSize[this.size];

    return `btn ${buttonColor} ${buttonSize}`;
  }

}
