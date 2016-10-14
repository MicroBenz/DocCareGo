import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'appointment-accordion',
    templateUrl: './appointment.accordion.view.html',
    styles: [`
        .appointment-timetable {
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;            
        }
        .card-header {
            background-color: #006ebb;
        }
        .card-header .card-header-title {
            cursor: default;
        }
        .card-header .card-header-title i {
            font-size: 26px;
            line-height: 26px;
            padding-right: 7px;
        }
        .card-header .card-header-title .doctor {
            font-size: 19px;
            line-height: 26px;
        }
        .card-header p, .card-header a{
            color: #ffffff;
        }
        .card-header .card-header-icon {
            line-height: 42px;
            margin-right: 7px;
        }
        .card {
            margin-bottom: 15px;
        }
    `]
})
export class AppointmentAccordionComponent {
    @Input('doctorName') doctor = 'นายแพทย์ธีรัช รักษ์เถา by default';
    @Input('timeTable') timeTable = [];
    @Input('isClearSelection') isClearSelection = true;
    @Output('selectedTime') selectedTime = new EventEmitter<any>();
    private isExpand = false;

    onSelectedAppointmentTime (appointmentTime) {
        appointmentTime['doctor'] = this.doctor;
        this.selectedTime.emit(appointmentTime);
    }
}