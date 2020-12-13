import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrsService } from 'src/app/services/toastrs.service';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrsService
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
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      this.toastrService.error("Correo y contraseña son obligatorios");
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
      this.toastrService.success("Inicio de sesión exitoso");
    } catch (error: any) {
      this.toastrService.error("Correo o contraseña incorrectos");
    }
    this.loading = false;
  }

}
