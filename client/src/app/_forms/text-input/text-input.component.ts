import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
// ControlValueAccessor is an interface that creates a bridge with the reactive form I believe
export class TextInputComponent implements ControlValueAccessor {
@Input() label: string;
@Input() type = 'text';

//self angular will always inject locally
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {

  }
  

}
