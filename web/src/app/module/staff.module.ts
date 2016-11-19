import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { PatientModule } from './patient.module';
import { StaffOnlyRoute } from './../auth/guard/staff.guard';
import { AppointmentManagementComponent, MakeAppointmentByStaffComponent } from './../role/staff/index';
import { AppointmentTableComponent } from './../shared/appointment/appointment.table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PatientModule
    ],
    declarations: [
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,
        AppointmentTableComponent
    ],
    exports: [
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,
        AppointmentTableComponent,  
    ],
    providers: [
        StaffOnlyRoute
    ]
})
export class StaffModule {}