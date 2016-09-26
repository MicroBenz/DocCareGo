import { Component } from '@angular/core';
import { NavigationService } from './../shared/navigation.service';
import { AuthService } from './../shared/auth.service';
import { DataService } from './../shared/data.service';
import { Http } from '@angular/http';

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
            width: 300px;
            margin-bottom: 15px;
        }
        #login-box {
            width: 350px;
        }
        #login-box input {
            width: 100%;
            padding: 10px;
            text-align: center;
            border: none;
            color: #000000;
        }
        #login-box input:focus {
            outline: 0px !important;
            -webkit-appearance: none;
        }
        #login-box input.corner-top {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            border-bottom: 1px solid #c8c7cc;        
        }
        #login-box input.corner-bottom {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;  
        }
        #login-box button {
            width: 100%;
            border-radius: 3px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        #login-box .register-text {
            font-size: 19px;
        }
        #login-box .register-button {
            color: #ffffff;
            font-weight: 700;
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

    constructor(private navigator: NavigationService, private authService: AuthService) {}

    private login () {
        console.log('GO LOGIN');
        this.authService.makeLogin();
    }
}