import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'appointment-summary-form',
    templateUrl: './appointment.summary.form.view.html'
})
export class AppointmentSummaryFormComponent {
    @Input('doctor') doctor: Object;
    @Input('clinic') clinic: Object;
    @Input('causeToAppointment') causeToAppointment: string;
    @Input('timeSlot') timeSlot: Object;
    @Output('onClickMakeAppointment') onClickMakeAppointment = new EventEmitter();

    makeAppointment () {
        this.onClickMakeAppointment.emit({
            description: this.causeToAppointment,
            doctor: this.doctor['HN'],
            workday: this.timeSlot['id']
        });
    }
}