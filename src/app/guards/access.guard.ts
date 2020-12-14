import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  canActivate() {
    if (this.userService.isAuth()) {
      this.router.navigateByUrl('/main/dashboard');
      return false;
    } else {
      return true;
    }
  }
}