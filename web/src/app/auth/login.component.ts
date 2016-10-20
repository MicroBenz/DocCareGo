import { Component } from '@angular/core';
import { Http } from '@angular/http';
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
        }
        #login-view {
            width: 100%;
        }
        #login-view #web-logo {
            width: 230px;
            margin-bottom: 25px;
        }
        #login-box {
            width: 350px;
            margin: auto;
        }
        #login-box input {
            width: 100%;
            padding: 10px;
            text-align: center;
            border: 1px solid #00a250;
            margin-bottom: 10px;
            box-shadow: none;
        }

        #login-box button {
            width: 100%;
            border-radius: 3px;
            margin-bottom: 15px;
        }
        #login-box .register-text {
            font-size: 19px;
        }
        #login-box .register-button {
            color: #00a250;
        }
        #login-box .register-button:hover {
            cursor: pointer;
        }
        .button {
            border: none;
            border-radius:  0px;
            transition: all 0.2s ease-in-out;
        }
        .is-primary {
            color: #ffffff;
            background-color: #00a250;
            height: 41px;
        }
        .is-primary:hover, .is-primary:active {
            color: #ffffff;
            background-color: #00a250;
        }
        .is-primary:hover {
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    `]
})
export class LoginComponent {
    public usr: string;
    public pwd: string;
    public isLoginFail: boolean = false;

    constructor(private authService: AuthService, private router: Router, private titleService: Title) {
        if (this.authService.hasLogin()) {
            this.router.navigateByUrl('/' + this.authService.getUserRole());
        }
        titleService.setTitle(LOGIN_TITLE);
    }

    private login () {
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