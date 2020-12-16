import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  // initializeForm(){      THIS IS BEFORE THE FORM BUILDER
  //   this.registerForm = new FormGroup({
  //     username: new FormControl('Hello', Validators.required),
  //     password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
  //     confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
  //     //we will use a custom validator to validat econfirm password with the password
  //   })
  // }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn   {//Validator function is the return
    return (control: AbstractControl) => {          //IsMatching: true is the case where validation fails
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }       

  register(){
    //register(this.model) but we're not doing this anymore because now we're using reactive forms
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      this.router.navigateByUrl('/members');
    }, error =>{
      this.validationErrors = error;
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
