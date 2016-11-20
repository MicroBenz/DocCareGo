import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { PatientModule } from './patient.module';
import { DoctorModule } from './doctor.module';
import { StaffOnlyRoute } from './../auth/guard/staff.guard';
import { AppointmentManagementComponent, MakeAppointmentByStaffComponent, WorkdayManagementByStaffComponent } from './../role/staff/index';
import { AppointmentTableComponent } from './../shared/appointment/appointment.table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PatientModule,
        DoctorModule
    ],
    declarations: [
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,
        AppointmentTableComponent,
        WorkdayManagementByStaffComponent
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