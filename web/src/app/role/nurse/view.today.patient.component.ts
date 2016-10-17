import { Component } from '@angular/core';
@Component({
    selector: 'view-today-patient',
    templateUrl: './view.today.patient.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .columns {
            box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
            border-radius: 5px;
            height: 550px;
        }
        .box {
            box-shadow: none;
            height: 100%;
            overflow-y: scroll;
            max-height: 550px;
        }
        .patient-list-wrapper {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px; 
            border-right: 1px solid #c8c7cc;           
        }
        .patient-recorder-wrapper {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;            
        }
        .title {
            font-size: 20px;
        }
    `]
})
export class ViewTodayPatientComponent {

}