import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PharmacistOnlyRoute } from './../auth/guard/pharmacist.guard';
import { ViewTodayPrescriptionComponent } from './../role/pharmacist/view.today.prescription.component';
import { PatientPrescriptionComponent } from './../role/pharmacist/patient.prescription.component';
import { PatientListComponent } from './../shared/component/patient.list.component';
import { SharedModule } from './shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ViewTodayPrescriptionComponent,
        PatientPrescriptionComponent,
        // PatientListComponent
    ],
    exports: [
        ViewTodayPrescriptionComponent,
        PatientPrescriptionComponent,
        // PatientListComponent
    ],
    providers: [
        PharmacistOnlyRoute
    ]
})
export class PharmacistModule {}