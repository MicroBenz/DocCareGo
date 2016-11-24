import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class MakeAppointmentComponent implements OnInit {
    public isMakeAppointmentSuccess: boolean;

    constructor(private authService: AuthService, private dataService: DataService) {}

    ngOnInit () {
        this.isMakeAppointmentSuccess = false;
    }

    onConfirmAppointment (formData) {
        formData['patient'] = this.authService.getUserHN();
        this.dataService.saveData(APPOINTMENT_ENDPOINT, formData)
            .subscribe(
                (success) => {
                    this.isMakeAppointmentSuccess = true;                    
                }
            )
    }
}