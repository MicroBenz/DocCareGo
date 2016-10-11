import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AuthService {

    constructor(private dataService: DataService, private router: Router) { }

    public makeLogin (usr: string, pwd: string) {
        //TODO: Call API for make login and get/set JWT Token
        if (usr === 'patient' || usr === 'doctor' || usr === 'staff' || usr ==='nurse' || usr === 'pharmacist') {
            this.setToken(usr);
        }
        else {
            this.setToken('patient');
        }
        this.router.navigateByUrl('/');
    }

    public makeLogout () {
        window.localStorage.removeItem('doccareGoRole');
        this.router.navigateByUrl('/login');
    }

    private setToken(usr: string) {
        window.localStorage['doccareGoRole'] = usr;
    }
}