import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { DoctorOnlyRoute } from './../auth/guard/index';
import { ManageWorkdayComponent } from './../role/doctor/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ManageWorkdayComponent
    ],
    exports: [
        ManageWorkdayComponent
    ],
    providers: [
        DoctorOnlyRoute
    ]
})
export class DoctorModule {}