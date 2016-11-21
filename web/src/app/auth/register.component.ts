import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { REGISTER_TITLE } from '../config/title.config';
import { Http, Response } from '@angular/http';
import { PATIENT_ENDPOINT, DOCTOR_ENDPOINT, NURSE_ENDPOINT, STAFF_ENDPOINT, PHARMACIST_ENDPOINT } from '../config/api.config';

@Component({
    selector: 'auth-register',
    templateUrl: './register.view.html',
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
        #register-view {
            width: 100%;
        }
        #register-box {
            width: 420px;
            margin: auto;
            padding: 25px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    `]
})
export class RegisterComponent implements OnInit {
    public formData;
    public endpoint;
    public confirmContent: string;
    public isShowConfirm: boolean;    
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowDuplicate: boolean;
    public isShowNotMatch: boolean;
    public isShowSuccess: boolean;
    constructor(private title: Title, private router: Router, private http: Http) {}

    ngOnInit () {
        this.title.setTitle(REGISTER_TITLE);
        this.formData = {
            'role':'patient',
            'username':'',
            'personalID':'',
            'email':'',
            'password':'',
            'reEnterPassword':''
        };
        this.endpoint = PATIENT_ENDPOINT;
    }

    private validateForm () {
        if (this.formData['role'] === '' || this.formData['username'] === '' || this.formData['personalID'] === ''
            || this.formData['email'] === '' || this.formData['password'] === '' || this.formData['reEnterPassword'] === '') {
            
            this.isShowInvalidate = true;
        }
        else if(this.formData['password'] !== this.formData['reEnterPassword']){
            this.isShowNotMatch = true;
        }
        else{
            this.isShowConfirm = true;
            this.decorateConfirmContent();
        }
    }

    private handleResponse = (res: Response) => {
        let result = res.json();
        if (result.success)
            return result.data;
        else
            throw new Error(result.clientMessage);
    }

    private handleError = (error) => {
        console.error('DataService Error: ', error);        
    }

    saveNewUser = () =>{
        this.http.post('/users/', this.formData)
            .map(this.handleResponse, this.handleError)
            .subscribe(
                (newUser) => {
                    console.log('NEW USER:', newUser);
                    this.isShowSuccess = true;
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    decorateConfirmContent(){
        this.confirmContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำการสมัครสมาชิก</h1>
            <p><b>ประเภทสมาชิก</b> ${this.formData['role']}</p>
            <p><b>HN</b> ${this.formData['username']}</p>
            <p><b>รหัสบัตรประชาชน</b> ${this.formData['personalID']}</p>
            <p><b>Email:</b> ${this.formData['email']}</p>
        `;
    }



    navigateToLoginPage = () => {
        this.router.navigateByUrl('/login');
    }

    dismissModal = () => {
        this.isShowSuccess = false;
        this.isShowNotMatch = false;
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.isShowDuplicate = false;
    }

}