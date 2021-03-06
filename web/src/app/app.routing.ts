import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Apps Components
import { AppComponentWithNavComponent } from './main/index';

// Auth Components
import { LoginComponent, RegisterComponent, NewPatientRegisterComponent } from './auth/index';

// Patient Components
import { MakeAppointmentComponent, ViewAppointmentComponent } from './role/patient/index';

// Staff Components
import { AppointmentManagementComponent, MakeAppointmentByStaffComponent, WorkdayManagementByStaffComponent } from './role/staff/index';

// Nurse Components
import { ViewTodayPatientComponent } from './role/nurse/index';

// Pharmacist Components
import { ViewTodayPrescriptionComponent } from './role/pharmacist/index';

// Doctor Components
import { ManageWorkdayComponent, AddWorkdayComponent } from './role/doctor/index';
import { StartWorkingComponent } from './role/doctor/make-diagnosis/index';

// Admin Component
import { PersonnelManagementComponent, AddPersonnelComponent } from './role/admin/personnel-management/index';
import { EditDoctorComponent, EditNurseComponent, EditPatientComponent, EditPharmacistComponent, EditStaffComponent } from './role/admin/personnel-management/edit/index';
import { MedicineManagementComponent, AddMedicineComponent, EditMedicineComponent } from './role/admin/medicine-management/index';
import { ClinicManagementComponent, AddClinicComponent, EditClinicComponent } from './role/admin/clinic-management/index';
// Auth Guard
import { AdminOnlyRoute, PatientOnlyRoute, DoctorOnlyRoute, NurseOnlyRoute, StaffOnlyRoute, PharmacistOnlyRoute, NonLoggedInRoute } from './auth/guard/index';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [
            NonLoggedInRoute
        ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [
            NonLoggedInRoute
        ]
    },
    {
        path: 'register/new-patient',
        component: NewPatientRegisterComponent,
        canActivate: [
            NonLoggedInRoute
        ]
    },
    {
        path: 'patient',
        component: AppComponentWithNavComponent,
        canActivate: [
            PatientOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/patient/view-appointment',
                pathMatch: 'full'
            },
            {
                path: 'make-appointment',
                component: MakeAppointmentComponent
            },
            {
                path: 'view-appointment',
                component: ViewAppointmentComponent
            }
        ]
    },
    {
        path: 'doctor',
        component: AppComponentWithNavComponent,
        canActivate: [
            DoctorOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/doctor/manage-workday',
                pathMatch: 'full'
            },
            {
                path: 'manage-workday',
                component: ManageWorkdayComponent
            },
            {
                path: 'add-workday',
                component: AddWorkdayComponent
            },
            {
                path: 'start-working',
                component: StartWorkingComponent
            }
        ]
    },
    {
        path: 'nurse',
        component: AppComponentWithNavComponent,
        canActivate: [
            NurseOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/nurse/view-today-patient',
                pathMatch: 'full'
            },
            {
                path: 'view-today-patient',
                component: ViewTodayPatientComponent
            }
        ]
    },
    {
        path: 'staff',
        component: AppComponentWithNavComponent,
        canActivate: [
            StaffOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/staff/manage-appointment',
                pathMatch: 'full'
            },
            {
                path: 'manage-appointment',
                component: AppointmentManagementComponent
            },
            {
                path: 'make-appointment',
                component: MakeAppointmentByStaffComponent
            },
            {
                path: 'manage-workday',
                component: WorkdayManagementByStaffComponent
            }
        ]
    },
    {
        path: 'pharmacist',
        component: AppComponentWithNavComponent,
        canActivate: [
            PharmacistOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/pharmacist/view-prescription',
                pathMatch: 'full'
            },
            {
                path: 'view-prescription',
                component: ViewTodayPrescriptionComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AppComponentWithNavComponent,
        canActivate: [
            AdminOnlyRoute
        ],
        children: [
            {
                path: '',
                redirectTo: '/admin/personnel-management',
                pathMatch: 'full'
            },
            {
                path: 'personnel-management',
                component: PersonnelManagementComponent
            },
            {
                path: 'personnel-management/add-personnel',
                component: AddPersonnelComponent
            },
            {
                path: 'personnel-management/edit-patient/:HN',
                component: EditPatientComponent
            },
            {
                path: 'personnel-management/edit-doctor/:HN',
                component: EditDoctorComponent
            },
            {
                path: 'personnel-management/edit-nurse/:HN',
                component: EditNurseComponent
            },
            {
                path: 'personnel-management/edit-staff/:HN',
                component: EditStaffComponent
            },
            {
                path: 'personnel-management/edit-pharmacist/:HN',
                component: EditPharmacistComponent
            },
            {
                path: 'medicine-management',
                component: MedicineManagementComponent
            },
            {
                path: 'medicine-management/add-medicine',
                component: AddMedicineComponent
            },
            {
                path: 'medicine-management/edit-medicine/:medicineName',
                component: EditMedicineComponent
            },
            {
                path: 'clinic-management',
                component: ClinicManagementComponent
            },
            {
                path: 'clinic-management/add-clinic',
                component: AddClinicComponent
            },
            {
                path: 'clinic-management/edit-clinic/:clinicName',
                component: EditClinicComponent
            }
        ]
    }
]

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);