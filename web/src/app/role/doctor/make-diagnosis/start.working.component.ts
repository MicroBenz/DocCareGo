import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT, DIAGNOSIS_RESULT_ENDPOINT } from '../../../config/api.config';
import { AuthService } from '../../../shared/service/auth.service';
import { DiagnosisFormComponent } from './diagnosis.form.component';
import { PatientInQueueComponent } from './patient.in.queue.component';
@Component({
    selector: 'start-working',
    templateUrl: './start.working.view.html',
    styles: [`
        .container-fluid {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-bottom: 10px;
        }
        .notification.is-info {
            line-height: 27px;
        }
        .notification.is-info .fa {
            font-size: 27px;
            margin-left: 5px;
            cursor: pointer;
        }
    `]
})
export class StartWorkingComponent implements OnInit {
    @ViewChild(DiagnosisFormComponent) private diagnosisFormComponent: DiagnosisFormComponent;
    @ViewChild(PatientInQueueComponent) private patientInQueueComponent: PatientInQueueComponent;

    public patientList: Array<Object>;
    public isShowDiagnosisForm: boolean;
    public isLockPatientList: boolean;
    public isShowConfirmNoti: boolean;
    public isShowErrorNoti: boolean;
    public isRecordSuccess: boolean;
    public diagnosisBody: Object;
    public selectedPatient: Object;
    public selectedPatientIndex: number;

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.patientList = [];
        this.isShowDiagnosisForm = false;
        this.isLockPatientList = false;
        this.isShowConfirmNoti = false;
        this.isShowErrorNoti = false;
        this.isRecordSuccess = false;
        this.selectedPatientIndex = -1;
        this.diagnosisBody = {};
        this.selectedPatient = {};
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            doctor: this.authService.getUserID()
        })
        .subscribe(
            (patients: Array<Object>) => {
                this.patientList = patients;
                console.log(patients);
            }
        )
    }

    onSelectPatient (index) {
        console.log('SELECTED' , index);
        this.selectedPatient = this.patientList[index];
        this.selectedPatientIndex = index;
        this.isShowDiagnosisForm = true;
        this.isLockPatientList = true;
    }

    popupNoti () {
        console.log('RECORD');
        this.isShowConfirmNoti = true;
        this.isShowErrorNoti = false;
        console.log(this.selectedPatient);
        let diagnosisBody = {
            appointment: this.selectedPatient['appointment']['_id'],
            description: this.diagnosisFormComponent.diagnosisData,
            numberOfMedicines: this.diagnosisFormComponent.medicineQuantity
        };
        if (diagnosisBody.description === undefined ||  diagnosisBody.description.trim().length === 0) {
            this.popupDangerNoti();
            return;
        }
        if (this.diagnosisFormComponent.diseasesList.length === 0) {
            this.popupDangerNoti();
            return;
        }
        diagnosisBody['diseases'] = this.diagnosisFormComponent.diseasesList.map(
            (item) => {
                return item['name'];
            }
        )
        if (this.diagnosisFormComponent.medicineList.length === 0) {
            this.popupDangerNoti();
            return;
        }
        diagnosisBody['medicines'] = this.diagnosisFormComponent.medicineList.map(
            (item) => {
                return item['name']
            }
        )
        this.diagnosisBody = diagnosisBody;
    }

    popupDangerNoti () {
        this.isShowConfirmNoti = false;
        this.isShowErrorNoti = true;
    }

    popupSuccessNoti () {

    }

    recordDiagnosis () {
        this.dataService.saveData(DIAGNOSIS_RESULT_ENDPOINT, this.diagnosisBody)
            .subscribe(
                (success) => {
                    console.log('SUCCESS RECORD');
                    this.patientInQueueComponent.patientList.splice(this.selectedPatientIndex, 1);
                    this.clearAllForm();
                    this.isRecordSuccess = true;
                    window.setTimeout(
                        () => {
                            this.isRecordSuccess = false;
                        }, 3000
                    )
                }
            )
    }

    clearAllForm () {
        this.isShowDiagnosisForm = false;
        this.dismissNoti();
        this.selectedPatient = {};
        this.isLockPatientList = false;
        this.diagnosisBody = {};
        this.diagnosisFormComponent.diagnosisData = '';
        this.diagnosisFormComponent.diseasesList = [];
        this.diagnosisFormComponent.medicineList = [];
        this.diagnosisFormComponent.medicineQuantity = [];
    }

    dismissNoti () {
        this.isShowErrorNoti = false;
        this.isShowConfirmNoti = false;
    }
}