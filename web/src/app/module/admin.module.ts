import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { AdminOnlyRoute } from './../auth/guard/admin.guard';
import { PersonnelManagementComponent, PersonnelTableComponent } from '../role/admin/personnel-management/index';
import { MedicineManagementComponent, MedicineTableComponent, EditMedicineComponent, MedicineFormComponent } from '../role/admin/medicine-management/index';
import { ClinicManagementComponent, ClinicTableComponent } from '../role/admin/clinic-management/index';
import {  } from '../role/admin/medicine-management/edit.medicine.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        PersonnelManagementComponent,
        PersonnelTableComponent,
        MedicineManagementComponent,
        MedicineTableComponent,
        EditMedicineComponent,
        MedicineFormComponent,
        ClinicManagementComponent,
        ClinicTableComponent
    ],
    exports: [
        PersonnelManagementComponent,
        ClinicManagementComponent,
        MedicineManagementComponent,  
        EditMedicineComponent
    ],
    providers: [
        AdminOnlyRoute
    ]
})
export class AdminModule {}