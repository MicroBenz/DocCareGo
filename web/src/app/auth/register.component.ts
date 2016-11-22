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
    public duplicateContent:string;
    public confirmContent: string;
    public HNNoMatchContent: string;
    public isShowConfirm: boolean;    
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowDuplicate: boolean;
    public isShowNotMatch: boolean;
    public isShowSuccess: boolean;
    public isShowOverLength: boolean;
    public isShowHNNoMatch: boolean;
    public isShowLowerLength: boolean;
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
        // else if(this.checkDuplicate()){
            
        // }
        else if(this.formData['password'] !== this.formData['reEnterPassword']){
            this.isShowNotMatch = true;
        }
        else if(this.formData['password'].length < 6){
            this.isShowLowerLength = true;

        }
        else if(this.formData['personalID'].length !== 13 || /[^\d]+/.exec(this.formData['personalID']) ){
            this.isShowOverLength = true;
        }
        
        else{
            this.isShowConfirm = true;
            this.decorateConfirmContent();
        }
    }

    private handleResponse = (res: Response) => {
        let result = res.json();
        console.log('result',result);
        if (result.success)
            return result.data;
        else
            throw new Error(result.clientMessage);
    }

    private handleError = (error) => {
        console.error('DataService Error: ', error);      
    }


// ============================ try to check duplicate before confirm modal ==============================
    checkDuplicate = () => {
        console.log('username' + this.formData['username']);
        this.http.get('/users/' + this.formData['username'])
            .map(this.handleResponse, this.handleError)
            .subscribe(
                (user) => {
                    console.log('USER:', user);
                    // this.isShowDuplicate = true;
                    // this.decorateDuplicateContent();
                    this.validateForm();
                },
                (error) => {
                    console.error(error);
                    this.isShowHNNoMatch = true;
                    this.decorateHNNoMatchContent();
                    
                }
            )
        
    }
// ==========================================================================================================


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
                    // this.isShowConfirm = false;
                    this.isShowDuplicate = true;
                    this.decorateDuplicateContent();
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

    decorateDuplicateContent(){
        this.duplicateContent = `
            <h1 class="title">รหัสHNไม่ถูกต้อง</h1>
            <p>กรุณาติดต่อเจ้าฟน้าที่</p>
            
        `;
        
    }

    decorateHNNoMatchContent(){
        this.HNNoMatchContent = `
            <h1 class="title">รหัสHNไม่ถูกต้อง</h1>
            <p><h3>กรุณากรอกรหัสใหม่อีกครั้ง</h3></p>
            `;
    }

    navigateToLoginPage = () => {
        this.router.navigateByUrl('/login');
    }

    dismissModal = () => {
        this.isShowHNNoMatch = false;
        this.isShowSuccess = false;
        this.isShowNotMatch = false;
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.isShowDuplicate = false;
        this.isShowLowerLength = false;
        this.isShowOverLength = false;
    }

}