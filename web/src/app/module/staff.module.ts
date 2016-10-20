import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffOnlyRoute } from './../auth/guard/staff.guard';
import { AppointmentManagementComponent } from './../role/staff/appointment.management.component';
import { MakeAppointmentByStaffComponent } from './../role/staff/make.appointment.component';
import { SearchBoxComponent } from './../shared/component/searchbox.component';
import { AppointmentTableComponent } from './../shared/appointment/appointment.table.component';
import { FormsModule } from '@angular/forms';
import { MakeAppointmentFormComponent } from './../shared/appointment/make.appointment.form.component';
import { SharedModule } from './shared.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,
        // SearchBoxComponent,
        AppointmentTableComponent,
    ],
    exports: [
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,
        // SearchBoxComponent,
        AppointmentTableComponent,   
    ],
    providers: [
        StaffOnlyRoute
    ]
})
export class StaffModule {}