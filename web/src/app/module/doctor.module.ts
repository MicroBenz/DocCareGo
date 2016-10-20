import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorOnlyRoute } from './../auth/guard/index';
import { ManageWorkdayComponent } from './../role/doctor/index';
import { FullCalendarComponent } from './../shared/calendar/full.calendar.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ManageWorkdayComponent,
        // FullCalendarComponent
    ],
    exports: [
        ManageWorkdayComponent
    ],
    providers: [
        DoctorOnlyRoute
    ]
})
export class DoctorModule {}