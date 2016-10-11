import { Component } from '@angular/core';
import { AuthService } from './../shared/auth.service';

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
    constructor(private authService: AuthService) {
        console.log(window.localStorage['doccareGoRole']);
        if (window.localStorage['doccareGoRole'] === undefined || window.localStorage['doccareGoRole'] === null) {
            console.error('No row');
        }
        else {
            this.userRole = window.localStorage['doccareGoRole'];
            this.userRoleDisplay = this.roleMapping[window.localStorage['doccareGoRole']]
        }
        this.userName = 'จอห์น';
    }

    logout () {
        this.authService.makeLogout();
    }
}