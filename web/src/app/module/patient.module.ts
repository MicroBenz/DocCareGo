import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { PatientOnlyRoute } from './../auth/guard/patient.guard';
import { MakeAppointmentComponent, ViewAppointmentComponent, AppointmentTimeSelectorComponent, AppointmentSummaryFormComponent } from './../role/patient/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        MakeAppointmentComponent,
        ViewAppointmentComponent,
        AppointmentTimeSelectorComponent,
        AppointmentSummaryFormComponent
    ],
    exports: [
        MakeAppointmentComponent,
        ViewAppointmentComponent,
        AppointmentTimeSelectorComponent,
        AppointmentSummaryFormComponent
    ],
    providers: [
        PatientOnlyRoute
    ]
})
export class PatientModule {}