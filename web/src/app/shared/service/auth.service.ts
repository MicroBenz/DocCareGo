import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { LOGIN_ENDPOINT } from './../../config/api.config';

@Injectable()
export class AuthService {
    constructor(private router: Router, private authHttp: AuthHttp, private http: Http, private jwtHelper: JwtHelper) {}

    public makeLogin (usr: string, pwd: string) {
        return this.http.post(LOGIN_ENDPOINT, {
            username: usr,
            password: pwd
        })
        .map(
            (res: Response) => {
                // return res.json();
                let result = res.json();
                if (result.success) {
                    return result.data;
                }
                else {
                    throw new Error(result.clientMessage);
                }
            },
            (error) => {
                console.error('AuthService Error: ', error);
                throw new Error(error);
            }
        )
    }

    public makeLogout () {
        window.localStorage.removeItem('doccareGoToken');
        this.router.navigateByUrl('/login');
    }

    public setToken(token: string) {
        window.localStorage.setItem('doccareGoToken', token);
    }

    public hasLogin() {
        var token = window.localStorage.getItem('doccareGoToken');
        return !(token === undefined || token === null);
    }

    public getUserRole () {
        if (this.hasLogin()) {
            return this.jwtHelper.decodeToken(window.localStorage.getItem('doccareGoToken')).role;
        }
        return '';
    }
}