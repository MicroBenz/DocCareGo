import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TokenService {
    private tokenKey: string = 'doccareGoToken';
    constructor(private jwtHelper: JwtHelper) { }

    public getUser () {
        if (this.isTokenExpire()) {
            return null;
        }
        else {
            return this.jwtHelper.decodeToken(window.localStorage.getItem(this.tokenKey));
        }
    }

    public getUserRole () {
        if (this.isTokenExpire()) {
            return '';
        }
        else {
            return this.jwtHelper.decodeToken(window.localStorage.getItem(this.tokenKey)).role;
        }
    }

    public isTokenExpire () {
        if (window.localStorage.getItem) {
            return this.jwtHelper.isTokenExpired(window.localStorage.getItem(this.tokenKey));
        }
        return false;
    }
}