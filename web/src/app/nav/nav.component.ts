import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/service/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { PATIENT_ROLE_NAV, DOCTOR_ROLE_NAV, NURSE_ROLE_NAV, PHARMACIST_ROLE_NAV, STAFF_ROLE_NAV, ADMIN_ROLE_NAV } from './../config/nav.config';

@Component({
    selector: 'apps-nav',
    templateUrl: './nav.view.html',
    styleUrls: ['nav.style.css']
})
export class NavComponent implements OnInit {
    public userRole: string;
    public userRoleDisplay: string;
    public userName: string;

    public navMenu = {};
    private roleMapping = {
        'admin': 'ผู้ดูแลระบบ',
        'patient': 'ผู้ป่วย',
        'doctor': 'แพทย์',
        'nurse': 'พยาบาล',
        'staff': 'เจ้าหน้าที่',
        'pharmacist': 'เภสัชกร'
    }


    constructor(private authService: AuthService, private jwtHelper: JwtHelper) {}

    ngOnInit () {
        this.userName = this.authService.getUsername();
        let role = this.authService.getUserRole();
        this.userRoleDisplay = this.roleMapping[role];
        switch (role) {
            case 'patient':
                this.navMenu = PATIENT_ROLE_NAV;
                break;
            case 'doctor':
                this.navMenu = DOCTOR_ROLE_NAV;
                break;
            case 'nurse':
                this.navMenu = NURSE_ROLE_NAV;
                break;
            case 'pharmacist':
                this.navMenu = PHARMACIST_ROLE_NAV;
                break;
            case 'staff':
                this.navMenu = STAFF_ROLE_NAV;
                break;
            case 'admin':
                this.navMenu = ADMIN_ROLE_NAV;
                break;
            default:
                console.error('[NavComponent] Wrong Role: ', role);
        }
    }

    logout () {
        return () => {
            this.authService.makeLogout();
        }
    }
}