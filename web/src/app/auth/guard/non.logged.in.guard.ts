import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './../../shared/service/auth.service';

@Injectable()
export class NonLoggedInRoute implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.hasLogin()) {
            this.router.navigateByUrl('/' + this.authService.getUserRole());
            return false;
        }
        else {
            return true;
        }
    }

    private redirectToLogin () {
        this.router.navigateByUrl('/login');
    }
}