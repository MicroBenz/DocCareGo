import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './shared.module';
import { PharmacistOnlyRoute } from './../auth/guard/pharmacist.guard';
import { ViewTodayPrescriptionComponent, PatientPrescriptionComponent, PatientAllergyComponent } from './../role/pharmacist/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ViewTodayPrescriptionComponent,
        PatientPrescriptionComponent,
        PatientAllergyComponent,
    ],
    exports: [
        ViewTodayPrescriptionComponent,
        PatientPrescriptionComponent,
        PatientAllergyComponent
    ],
    providers: [
        PharmacistOnlyRoute
    ]
})
export class PharmacistModule {}