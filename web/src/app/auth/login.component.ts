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
        #login-box .button-wrapper {
            display: flex;
            margin-bottom: 10px;
        }
        #login-box .button-wrapper > * {
            flex: 1;
            margin-right: 5px;
        }
        #login-box .button-wrapper > :last-child {
            flex: 1;
            margin-right: 0px;
        }
    `]
})
export class LoginComponent implements OnInit {
    public usr: string;
    public pwd: string;
    public isLoginFail: boolean;
    public loginFailMessage: string;
    public isWaitForLogin: boolean;

    constructor(private authService: AuthService, private router: Router, private titleService: Title) {}

    ngOnInit () {
        if (this.authService.hasLogin()) {
            this.router.navigateByUrl('/' + this.authService.getUserRole());
        }
        this.titleService.setTitle(LOGIN_TITLE);
        this.isLoginFail = false;
        this.loginFailMessage = '';
        this.isWaitForLogin = false;
    }

    public login () {
        this.isLoginFail = false;
        this.isWaitForLogin = true;
        if (this.usr === undefined || this.usr === '' || this.pwd === undefined || this.pwd === '') {
            this.isLoginFail = true;
            this.loginFailMessage = 'โปรดกรอกชื่อผู้ใช้ และรหัสผ่าน';
            this.isWaitForLogin = false;            
            return;
        }
        this.authService.makeLogin(this.usr, this.pwd)
            .subscribe(this.loginSuccess, this.loginFail);
    }

    private loginSuccess = (data) => {
        this.authService.setToken(data.token);
        this.router.navigateByUrl('/' + data.role);        
    }

    private loginFail = (error) => {      
        console.error(error);
        this.isLoginFail = true;
        this.loginFailMessage = 'ล็อคอินล้มเหลว กรุณาลองใหม่';
        this.isWaitForLogin = false;        
    }

    public navigateToRegister () {
        this.router.navigateByUrl('/register');
    }

    public navigateToNewPatientRegister () {
        this.router.navigateByUrl('/register/new-patient');        
    }
}