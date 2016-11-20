import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { DoctorOnlyRoute } from './../auth/guard/index';
import { ManageWorkdayComponent, AddWorkdayComponent, WorkdaySelectorComponent, WorkdayPatientListComponent } from './../role/doctor/index';
import { StartWorkingComponent, PatientInQueueComponent } from './../role/doctor/make-diagnosis/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ManageWorkdayComponent,
        AddWorkdayComponent,
        WorkdaySelectorComponent,
        WorkdayPatientListComponent,
        StartWorkingComponent,
        PatientInQueueComponent
    ],
    exports: [
        ManageWorkdayComponent,
        AddWorkdayComponent,
        WorkdaySelectorComponent,
        WorkdayPatientListComponent
    ],
    providers: [
        DoctorOnlyRoute
    ]
})
export class DoctorModule {}