import { Component } from '@angular/core';
import { NavigationService } from './../shared/navigation.service';
import { AuthService } from './../shared/auth.service';
import { DataService } from './../shared/data.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
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
        }
        #login-box input {
            width: 100%;
            padding: 10px;
            text-align: center;
            border: 1px solid #00a250;
            margin-bottom: 10px;
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
    `],
    providers: [NavigationService, AuthService]
})
export class LoginComponent {
    public usr: string;
    public pwd: string;

    constructor(private navigator: NavigationService, private authService: AuthService, private router: Router) {}

    private login () {
        //TODO: Made Login
        this.router.navigate(['/']);
    }
}