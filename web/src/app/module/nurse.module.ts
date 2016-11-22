import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { NurseOnlyRoute } from './../auth/guard/nurse.guard';
import { ViewTodayPatientComponent } from './../role/nurse/view.today.patient.component';
import { RecordPatientDetailComponent } from './../role/nurse/record.patient.detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ViewTodayPatientComponent,
        RecordPatientDetailComponent
    ],
    exports: [
        ViewTodayPatientComponent,
        RecordPatientDetailComponent
    ],
    providers: [
        NurseOnlyRoute
    ]
})
export class NurseModule {}