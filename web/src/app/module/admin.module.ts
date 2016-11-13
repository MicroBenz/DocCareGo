import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { AdminOnlyRoute } from './../auth/guard/admin.guard';
import { PersonnelManagementComponent, PersonnelTableComponent, AddDoctorComponent, AddPatientComponent, AddNurseComponent, AddStaffComponent, AddPharmacistComponent } from '../role/admin/personnel-management/index';
import { MedicineManagementComponent, MedicineTableComponent, AddMedicineComponent, EditMedicineComponent, MedicineFormComponent } from '../role/admin/medicine-management/index';
import { ClinicManagementComponent, ClinicTableComponent } from '../role/admin/clinic-management/index';

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
        AddMedicineComponent,
        EditMedicineComponent,
        MedicineFormComponent,
        ClinicManagementComponent,
        ClinicTableComponent,

        AddDoctorComponent,
        AddPatientComponent,
        AddNurseComponent,
        AddStaffComponent,
        AddPharmacistComponent
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