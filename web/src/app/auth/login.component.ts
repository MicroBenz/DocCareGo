import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../shared/service/auth.service';
import { LOGIN_TITLE } from './../config/title.config';

@Component({
    selector: 'auth-login',
    templateUrl: 'login.view.html',
    styleUrls: ['./login.style.css']
})
export class LoginComponent implements OnInit {
    public usr: string;
    public pwd: string;
    public isLoginFail: boolean;
    public loginFailMessage: string;

    constructor(private authService: AuthService, private router: Router, private titleService: Title) {}

    ngOnInit () {
        if (this.authService.hasLogin()) {
            this.router.navigateByUrl('/' + this.authService.getUserRole());
        }
        this.titleService.setTitle(LOGIN_TITLE);
        this.isLoginFail = false;
        this.loginFailMessage = '';
    }

    public login () {
        this.isLoginFail = false;
        if (this.usr === undefined || this.usr === '' || this.pwd === undefined || this.pwd === '') {
            console.log('please fill form');
            this.isLoginFail = true;
            this.loginFailMessage = 'โปรดกรอกชื่อผู้ใช้ และรหัสผ่าน';
            return;
        }
        this.authService.makeLogin(this.usr, this.pwd)
            .subscribe(this.loginSuccess, this.loginFail);
    }

    private loginSuccess = (data) => {
        console.log('login success');
        this.authService.setToken(data.token);
        this.router.navigateByUrl('/' + data.role);        
    }

    private loginFail = (error) => {      
        console.error(error);
        this.isLoginFail = true;
        this.loginFailMessage = 'ล็อคอินล้มเหลว กรุณาลองใหม่';
    }
}