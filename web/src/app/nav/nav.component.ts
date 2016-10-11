import { Component } from '@angular/core';

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
    constructor() {
        if (window.localStorage['doccareGo'] === undefined || window.localStorage['doccareGo'] === null) {
            this.userRole = 'doctor';
            this.userRoleDisplay = this.roleMapping[this.userRole];
        }
        else if (window.localStorage['doccareGo']['role'] === undefined) {
            this.userRole = 'staff'
            this.userRoleDisplay = 'เจ้าหน้าที่';
        }
        else {
            this.userRole = window.localStorage['doccareGo']['role'];
            this.userRoleDisplay = this.roleMapping[window.localStorage['doccareGo']['role']]
        }
        this.userName = 'จอห์น';
    }
}