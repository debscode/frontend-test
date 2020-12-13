import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * createForm creates login form
   */
  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  async submit() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }    
    const request: Login = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };
    try {
      const res: any = await this.userService.login(request);
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.user.email);
    } catch (error) {
      console.log(error);
    }
  }

}
