import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTodayPatientComponent } from './../role/nurse/view.today.patient.component';
import { PatientListComponent } from './../shared/component/patient.list.component';
import { RecordPatientDetailComponent } from './../role/nurse/record.patient.detail.component';
import { NurseOnlyRoute } from './../auth/guard/nurse.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ViewTodayPatientComponent,
        // PatientListComponent,
        RecordPatientDetailComponent
    ],
    exports: [
        ViewTodayPatientComponent,
        // PatientListComponent,
        RecordPatientDetailComponent
    ],
    providers: [
        NurseOnlyRoute
    ]
})
export class NurseModule {}