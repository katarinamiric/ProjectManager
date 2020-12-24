import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-area-field-input',
  templateUrl: './area-field-input.component.html',
  styleUrls: ['./area-field-input.component.css']
})
export class AreaFieldInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';
  @Input() rows: number = 30;
  @Input() columns: number = 30;

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }


  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }


  ngOnInit(): void {
  }

}
