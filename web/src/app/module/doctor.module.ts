import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { DoctorOnlyRoute } from './../auth/guard/index';
import { ManageWorkdayComponent, AddWorkdayComponent } from './../role/doctor/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ManageWorkdayComponent,
        AddWorkdayComponent
    ],
    exports: [
        ManageWorkdayComponent,
        AddWorkdayComponent
    ],
    providers: [
        DoctorOnlyRoute
    ]
})
export class DoctorModule {}