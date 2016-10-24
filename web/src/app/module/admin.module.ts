import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { AdminOnlyRoute } from './../auth/guard/admin.guard';
import { PersonnelManagementComponent, PersonnelTableComponent } from '../role/admin/personnel-management/index';
import { MedicineManagementComponent, MedicineTableComponent } from '../role/admin/medicine-management/index';

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
        MedicineTableComponent
    ],
    exports: [
        PersonnelManagementComponent,
        MedicineManagementComponent      
    ],
    providers: [
        AdminOnlyRoute
    ]
})
export class AdminModule {}