import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppointmentTableSelectionComponent, AppointmentAccordionComponent } from './../role/patient/index';
import { MakeAppointmentFormComponent, AppointmentTableCompactComponent } from './../shared/appointment/index';
import { PatientListComponent, MiniCalendarComponent, SearchBoxComponent } from './../shared/component/index';
import { FullCalendarComponent } from './../shared/calendar/full.calendar.component';
import { ModalComponent } from './../shared/modal/modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        // Appointment Related
        MakeAppointmentFormComponent,
        AppointmentTableSelectionComponent,
        AppointmentAccordionComponent,
        AppointmentTableCompactComponent,

        // Shared Component
        MiniCalendarComponent,
        SearchBoxComponent,
        PatientListComponent,
        FullCalendarComponent,
        ModalComponent
    ],
    exports: [
        MakeAppointmentFormComponent,
        AppointmentAccordionComponent,
        AppointmentTableCompactComponent,
        
        MiniCalendarComponent,
        SearchBoxComponent,
        PatientListComponent,
        FullCalendarComponent,
        ModalComponent      
    ]
})
export class SharedModule {}