import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeAppointmentFormComponent } from './../shared/appointment/make.appointment.form.component';
import { FormsModule } from '@angular/forms';
import { AppointmentTableSelectionComponent } from './../role/patient/appointment.table.selection.component';
import { AppointmentAccordionComponent } from './../role/patient/appointment.accordion.component';
import { PatientListComponent } from './../shared/component/patient.list.component';
import { MiniCalendarComponent } from './../shared/component/mini.calendar.component';
import { SearchBoxComponent } from './../shared/component/searchbox.component';
import { FullCalendarComponent } from './../shared/calendar/full.calendar.component';
import { AppointmentTableCompactComponent } from './../shared/appointment/appointment.table.compact.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
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
        FullCalendarComponent
    ],
    exports: [
        MakeAppointmentFormComponent,
        AppointmentAccordionComponent,
        AppointmentTableCompactComponent,
        
        MiniCalendarComponent,
        SearchBoxComponent,
        PatientListComponent,
        FullCalendarComponent        
    ]
})
export class SharedModule {}