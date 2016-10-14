import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    constructor(private router: Router, private authHttp: AuthHttp, private http: Http, private jwtHelper: JwtHelper) {}

    // Authenticate with Server-Side
    public makeLogin (usr: string, pwd: string) {
        //TODO: Call API for make login and get/set JWT Token
        if (usr === 'patient' || usr === 'doctor' || usr === 'staff' || usr ==='nurse' || usr === 'pharmacist') {
            return this.http.post('/auth/login', {
                username: 'John',
                role: usr
            })
            .map((res: Response) => {
                return res.json();
            })
        }
    }

    public makeLogout () {
        window.localStorage.removeItem('doccareGoToken');
        this.router.navigateByUrl('/login');
    }

    // Client Side
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

    public testHTTP () {
        console.log('inside service');
        return this.authHttp.post('/api/v1/test', {
            a: '111',
            b: '223'
        });
    }
}