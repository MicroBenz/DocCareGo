import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './../../shared/service/auth.service';

@Injectable()
export class StaffOnlyRoute implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.getUserRole() !== 'staff') {
            this.redirectToLogin();
            return false;
        }
        return true;
    }

    private redirectToLogin () {
        this.router.navigateByUrl('/login');
    }
}