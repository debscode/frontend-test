import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUser, UpdateUser } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { ToastrsService } from '../../../../services/toastrs.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  user: GetUser;
  userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrsService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
 * createForm creates register form
 */
  createForm(): void {
    this.form = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['*********', [Validators.required]]
    });
  }

  get nameRInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get lastNameRInvalid() {
    return this.form.get('last_name').invalid && this.form.get('last_name').touched;
  }
  get emailRInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get passwordRInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  async submit() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      this.toastrService.error("Ingresar campos obligatorios");
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const request: UpdateUser = {
      id: this.userId,
      name: this.form.controls.name.value,
      last_name: this.form.controls.last_name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };
    try {
      const res: any = await this.userService.updateUser(request);
      this.toastrService.success("Actualización exitosa");
    } catch (error: any) {
      this.toastrService.error("Ocurrio un error por favor intenta nuevamente");
    }
    this.loading = false;
  }

  async getUserInfo() {
    this.loading = true;
    this.userId = this.userService.readUserId();
    try {
      const res: any = await this.userService.getUser(this.userId);
      console.log(res);
      
      this.user = res;
      this.createForm();
    } catch (error) {
      this.toastrService.error("Ocurrio un error por favor intenta nuevamente");
    }
    this.loading = false;    
  }

}
