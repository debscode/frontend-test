import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrsService } from 'src/app/services/toastrs.service';
import { UserService } from 'src/app/services/user.service';
import { Login, User } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formRegister: FormGroup;
  loading: boolean = false;
  isRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Creates login form
   */
  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
  * Creates register form
  */
  createFormRegister(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  //Not valid gettes Login
  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  //Not valid gettes Register
  get nameRInvalid() {
    return this.formRegister.get('name').invalid && this.formRegister.get('name').touched;
  }
  get lastNameRInvalid() {
    return this.formRegister.get('last_name').invalid && this.formRegister.get('last_name').touched;
  }
  get emailRInvalid() {
    return this.formRegister.get('email').invalid && this.formRegister.get('email').touched;
  }
  get passwordRInvalid() {
    return this.formRegister.get('password').invalid && this.formRegister.get('password').touched;
  }

  /**
   * Login user
   */
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
      this.userService.saveToken(res.token);
      this.userService.saveEmail(res.user.email);
      this.userService.saveUserId(res.user.id);
      this.toastrService.success("Inicio de sesión exitoso");
      this.router.navigateByUrl('main');
    } catch (error: any) {
      this.toastrService.error("Correo o contraseña incorrectos");
    }
    this.loading = false;
  }

  register() {
    this.createFormRegister();
    this.isRegister = !this.isRegister;
  }

  /**
   * Create a new user
   */
  async submitRegister() {
    this.loading = true;
    if (this.formRegister.invalid) {
      this.loading = false;
      this.toastrService.error("Ingresar campos obligatorios");
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const request: User = {
      name: this.formRegister.controls.name.value,
      last_name: this.formRegister.controls.last_name.value,
      email: this.formRegister.controls.email.value,
      password: this.formRegister.controls.password.value
    };
    try {
      const res: any = await this.userService.register(request);
      this.toastrService.success("Registro exitoso");
      this.router.navigateByUrl('main');
    } catch (error: any) {
      this.toastrService.error("Ocurrio un error por favor intenta nuevamente");
    }
    this.loading = false;
  }

}
