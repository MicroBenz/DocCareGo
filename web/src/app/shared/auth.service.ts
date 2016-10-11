import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
@Injectable()
export class AuthService {

    constructor(private dataService: DataService, private router: Router, private authHttp: AuthHttp, private http: Http) { }

    public makeLogin (usr: string, pwd: string) {
        //TODO: Call API for make login and get/set JWT Token
        if (usr === 'patient' || usr === 'doctor' || usr === 'staff' || usr ==='nurse' || usr === 'pharmacist') {
            this.setToken(usr);
            this.router.navigateByUrl('/' + usr);            
        }
        else {
            this.setToken('patient');
            this.router.navigateByUrl('/' + usr);
        }
    }

    public makeLogout () {
        window.localStorage.removeItem('doccareGoRole');
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
        return window.localStorage['doccareGoRole'];
    }

    public testHTTP () {
        console.log('inside service');
        return this.http.post('/api/v1/test', {
            a: '111',
            b: '222'
        });
    }
}