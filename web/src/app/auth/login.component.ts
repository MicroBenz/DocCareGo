import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../shared/service/auth.service';
import { LOGIN_TITLE } from './../config/title.config';

@Component({
    selector: 'auth-login',
    templateUrl: 'login.view.html',
    styles: [`
        :host {
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            background-image: url('assets/img/login_bg3.jpg');
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
        #login-view {
            width: 100%;
        }
        #login-view #web-logo {
            width: 400px;
            margin-bottom: 15px;
        }
        #login-box {
            width: 420px;
            margin: auto;
            padding: 25px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
        #login-box .control input, #login-box .button {
            width: 100%;
        }
    `]
})
export class LoginComponent implements OnInit {
    public usr: string;
    public pwd: string;
    public isLoginFail: boolean;

    constructor(private authService: AuthService, private router: Router, private titleService: Title) {}

    ngOnInit () {
        if (this.authService.hasLogin()) {
            this.router.navigateByUrl('/' + this.authService.getUserRole());
        }
        this.titleService.setTitle(LOGIN_TITLE);
        this.isLoginFail = false;
    }

    public login () {
        //TODO: Made Login
        if (this.usr === 'patient' || this.usr === 'doctor' || this.usr === 'staff' || this.usr ==='nurse' || this.usr === 'pharmacist' || this.usr === 'admin') {
            this.isLoginFail = false;
            this.authService.makeLogin(this.usr, this.pwd)
                .subscribe((data) => {
                    console.log(data);
                    this.authService.setToken(data.data.token);
                    console.log('before navigate');
                    this.router.navigateByUrl('/' + data.data.role);
                });
        }
        else {
            this.isLoginFail = true;
        }
    }
}