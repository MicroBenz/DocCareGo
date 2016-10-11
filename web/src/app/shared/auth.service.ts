import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
@Injectable()
export class AuthService {

    constructor(private dataService: DataService, private router: Router, private authHttp: AuthHttp, private http: Http, private jwtHelper: JwtHelper) { }

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
        window.localStorage.removeItem('doccareGoRole');
        window.localStorage.removeItem('doccareGoToken');
        this.router.navigateByUrl('/login');
    }

    private setToken(usr: string) {
        window.localStorage['doccareGoRole'] = usr;
    }

    public hasLogin() {
        if (window.localStorage['doccareGoRole'] === undefined || window.localStorage['doccareGoRole'] === null) {
            return false;
        }
        return true;
    }

    public getUserRole () {
        if (window.localStorage.getItem('doccareGoToken')) {
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