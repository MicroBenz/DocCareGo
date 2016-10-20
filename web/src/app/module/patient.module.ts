import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentAccordionComponent, AppointmentTableSelectionComponent, MakeAppointmentComponent, ViewAppointmentComponent } from './../role/patient/index';
import { PatientOnlyRoute } from './../auth/guard/patient.guard';

import { MakeAppointmentFormComponent } from './../shared/appointment/make.appointment.form.component';
import { MiniCalendarComponent } from './../shared/component/mini.calendar.component';
import { AppointmentTableCompactComponent } from './../shared/appointment/appointment.table.compact.component';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        // AppointmentAccordionComponent,
        // AppointmentTableSelectionComponent,
        MakeAppointmentComponent,
        ViewAppointmentComponent,
        // MiniCalendarComponent,
        // AppointmentTableCompactComponent
    ],
    exports: [
        // AppointmentAccordionComponent,        
        // AppointmentTableSelectionComponent,
        MakeAppointmentComponent,
        ViewAppointmentComponent,
    ],
    providers: [
        PatientOnlyRoute
    ]
})
export class PatientModule {}