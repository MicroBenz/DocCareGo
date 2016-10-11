import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelper, private router: Router) {}

    canActivate() {
        var token = window.localStorage['doccareGoToken'];
        if (!token) {
            this.redirectToLogin();
            return false;
        }
        else {
            if (this.jwtHelper.isTokenExpired(token)) {
                window.localStorage.removeItem('doccareGoToken');
                this.redirectToLogin();                
                return false;
            }
            return true;
        }
    }

    private redirectToLogin () {
        this.router.navigateByUrl('/login');
    }
}