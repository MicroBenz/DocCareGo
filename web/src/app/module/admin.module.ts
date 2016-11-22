import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { AdminOnlyRoute } from './../auth/guard/admin.guard';
import { PersonnelManagementComponent, PersonnelTableComponent, AddPersonnelComponent } from '../role/admin/personnel-management/index';
import { DoctorFormComponent, NurseFormComponent, PatientFormComponent, PharmacistFormComponent, StaffFormComponent } from '../role/admin/personnel-management/personnel-form/index';
import { EditDoctorComponent, EditNurseComponent, EditPatientComponent, EditPharmacistComponent, EditStaffComponent } from '../role/admin/personnel-management/edit/index';
import { MedicineManagementComponent, MedicineTableComponent, AddMedicineComponent, EditMedicineComponent, MedicineFormComponent } from '../role/admin/medicine-management/index';
import { ClinicManagementComponent, ClinicTableComponent, AddClinicComponent, EditClinicComponent, ClinicFormComponent } from '../role/admin/clinic-management/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        PersonnelManagementComponent,
        PersonnelTableComponent,
        AddPersonnelComponent,
        DoctorFormComponent,
        NurseFormComponent,
        PatientFormComponent,
        PharmacistFormComponent,
        StaffFormComponent,

        EditDoctorComponent,
        EditNurseComponent,
        EditPatientComponent,
        EditPharmacistComponent,
        EditStaffComponent,

        MedicineManagementComponent,
        MedicineTableComponent,
        AddMedicineComponent,
        EditMedicineComponent,
        MedicineFormComponent,

        ClinicManagementComponent,
        ClinicTableComponent,
        AddClinicComponent,
        EditClinicComponent,
        ClinicFormComponent
    ],
    exports: [
        PersonnelManagementComponent,
        ClinicManagementComponent,
        MedicineManagementComponent,  
        EditMedicineComponent,

        PatientFormComponent
    ],
    providers: [
        AdminOnlyRoute
    ]
})
export class AdminModule {}