import { Component } from '@angular/core';

@Component({
    selector: 'appointment-selection',
    templateUrl: './appointment.accordion.view.html',
    styles: [`
        .notification {
            margin-bottom: 0px;
            padding-top: 10px;
            padding-bottom: 10px;
            cursor: default;
        }
        .expand {
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;          
        }
        .appointment-timetable {
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;            
        }
    `]
})
export class AppointmentAccordionComponent {

}