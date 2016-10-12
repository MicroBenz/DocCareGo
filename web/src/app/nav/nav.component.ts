import { Component } from '@angular/core';
import { AuthService } from './../shared/service/auth.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'apps-nav',
    templateUrl: './nav.view.html',
    styles: [`
        .top-nav > .container{
            border-bottom: 1px solid #f3f3f3;
        }
        .menu-nav > .container a {
            line-height: 34px;
        }
        .profile-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            color: #fff;
            line-height: 40px;
            text-align: center;
        }
        .profile-circle a {
            color: #ffffff;
            cursor: default;
        }
        .profile-name, .profile-circle{
            display: inline-block;
        }
        .button {
            border-radius: 3px;
        }
    `]
})
export class NavComponent {
    public userRole: string;
    public userRoleDisplay: string;
    public userName: string;
    private roleMapping = {
        'patient': 'ผู้ป่วย',
        'doctor': 'แพทย์',
        'nurse': 'พยาบาล',
        'staff': 'เจ้าหน้าที่',
        'pharmacist': 'เภสัชกร'
    }
    constructor(private authService: AuthService, private jwtHelper: JwtHelper) {
        console.log(window.localStorage['doccareGoToken']);
        if (window.localStorage['doccareGoToken'] === undefined || window.localStorage['doccareGoToken'] === null) {
            console.error('No row');
        }
        else {
            let user = this.jwtHelper.decodeToken(window.localStorage['doccareGoToken']);
            this.userRole = user.role;
            this.userRoleDisplay = this.roleMapping[this.userRole];
        }
        this.userName = 'จอห์น';
    }

    logout () {
        this.authService.makeLogout();
    }
}