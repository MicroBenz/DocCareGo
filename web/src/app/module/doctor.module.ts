import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { DoctorOnlyRoute } from './../auth/guard/index';
import { ManageWorkdayComponent, AddWorkdayComponent, WorkdaySelectorComponent, WorkdayPatientListComponent } from './../role/doctor/index';
import { StartWorkingComponent, PatientInQueueComponent, DiagnosisFormComponent, DiseasesSelectorComponent, MedicineSelectorComponent } from './../role/doctor/make-diagnosis/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ManageWorkdayComponent,
        AddWorkdayComponent,
        WorkdaySelectorComponent,
        WorkdayPatientListComponent,
        StartWorkingComponent,
        PatientInQueueComponent,
        DiagnosisFormComponent,
        DiseasesSelectorComponent,
        MedicineSelectorComponent
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