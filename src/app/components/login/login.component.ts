import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * createForm creates login form
   */
  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get emailInvalid(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get passwordInvalid(){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  submit(){
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
      });
    }
    console.log('valor', this.form.value);    
  }

}
