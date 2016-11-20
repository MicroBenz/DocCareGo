import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { LOGIN_ENDPOINT } from '../config/api.config';
import { PATIENT_ENDPOINT } from '../config/api.config';
import { NEW_PATIENT_REGISTER_TITLE } from '../config/title.config';

@Component({
    selector: 'new-patient-register',
    templateUrl: './new.patient.register.view.html',
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
            width: 80%;
            margin: auto;
            padding: 25px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    `]
})
export class NewPatientRegisterComponent implements OnInit {
    public formData;
    public confirmModalContent: string;
    public alertContent: string;
    public isShowConfirm: boolean;    
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowAlert: boolean;
    public isShowOverLength: boolean;
    public isWrongZipCode: boolean;
    constructor(private title: Title, private router: Router, private route: ActivatedRoute, private http: Http) {}
    ngOnInit () {
        this.formData = {
            'HN' : '',
            'personalID' : '',
            'preName' : '',
            'name' : '',
            'surname' : '',
            'houseNumber': '',
            'road' : '',
            'soi' : '',
            'subdistrict' : '',
            'district' : '',
            'province' : '',
            'zipCode' : '',
            'country' : '',
            'tel' : '',
            'noMedicines' : ''
        };
        this.confirmModalContent = '';
        this.title.setTitle(NEW_PATIENT_REGISTER_TITLE);

    }
    private validateForm () {
        if (this.formData['personalID'] === '' || this.formData['preName'] === '' || this.formData['name'] === '' || this.formData['surname'] === ''
            || this.formData['houseNumber'] === '' || this.formData['road'] === '' || this.formData['soi'] === '' || this.formData['subdistrict'] === ''
            || this.formData['district'] === '' || this.formData['province'] === '' || this.formData['zipCode'] === '' || this.formData['country'] === ''
            || this.formData['tel'] === '') {
            this.isShowInvalidate = true;
        }
        else if(this.formData['personalID'].length !== 13 || /[^\d]+/.exec(this.formData['personalID']) ){
            this.isShowOverLength = true;
        }
        else if( /[^\d]+/.exec(this.formData['zipCode']) ){
            this.isWrongZipCode = true;
        }
        else {
            console.log('VALIADETED');
            this.http.get('/auth' + '/generateNewHN')
                .map(this.handleResponse, this.handleError)
                .subscribe(
                    (newHN) => {
                        console.log('NewHN:', newHN.HN);
                        this.formData['HN'] = newHN.HN;
                        this.decorateModalContent();
                    }
                    
                )

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

    decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำการแก้ไข</h1>
            <p><b>รหัสHNของคุณคือ</b> ${this.formData['HN']}</p>
            <p><b>รหัสบัตรประชาชน</b> ${this.formData['personalID']}</p>
            <p><b>ชื่อ:</b> ${this.formData['name']}</p>
            <p><b>นามสกุล:</b> ${this.formData['surname']}</p>
            <p><b>บ้านเลขที่:</b> ${this.formData['houseNumber']}</p>
            <p><b>ถนน:</b> ${this.formData['road']}</p>
            <p><b>ซอย:</b> ${this.formData['soi']}</p>
            <p><b>แขวง:</b> ${this.formData['subdistrict']}</p>
            <p><b>เขต:</b> ${this.formData['district']}</p>
            <p><b>จังหวัด:</b> ${this.formData['province']}</p>
            <p><b>ประเทศ:</b> ${this.formData['country']}</p>
            <p><b>เบอร์โทร:</b> ${this.formData['tel']}</p>
            <p><b>ยาที่แพ้:</b> ${this.formData['noMedicines']}</p>
        `;
        this.isShowConfirm = true;
    }
    addNewPatient = () => {
        this.http.post('/auth/newPatient', this.formData)
            .map(this.handleResponse, this.handleError)
            .subscribe(
                (newPatient) => {
                    console.log('NEW PATIENT:' newPatient);
                    this.decorateAlertContent();
                    this.isShowConfirm = false;
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    decorateAlertContent(){
        this.alertContent = `
            <h1 class="title">กรุณาจดรหัสนี้ไว้เพื่อสมัครสมาชิกเข้าสู่ระบบต่อไป</h1>
            <p><b>รหัสHNของคุณคือ</b> ${this.formData['HN']}</p>
        `;
        this.isShowAlert = true;
    }

    navigateToLoginPage = () => {
        this.router.navigateByUrl('/login');
    }
    
     dismissModal = () => {
        this.isShowOverLength = false;
        this.isWrongZipCode = false;
        this.isShowAlert = false;
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }
}