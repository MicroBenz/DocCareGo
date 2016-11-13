import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Apps Components
import { AppComponentWithNavComponent } from './main/index';
import { LoginComponent, RegisterComponent } from './auth/index';

// Patient Components
import { MakeAppointmentComponent, ViewAppointmentComponent } from './role/patient/index';

// Staff Components
import { AppointmentManagementComponent, MakeAppointmentByStaffComponent } from './role/staff/index';

// Nurse Components
import { ViewTodayPatientComponent } from './role/nurse/index';

// Pharmacist Components
import { ViewTodayPrescriptionComponent } from './role/pharmacist/index';

// Doctor Components
import { ManageWorkdayComponent, AddWorkdayComponent } from './role/doctor/index';

// Admin Component
import { PersonnelManagementComponent, AddPatientComponent, AddDoctorComponent, AddNurseComponent, AddPharmacistComponent, AddStaffComponent } from './role/admin/personnel-management/index';
import { MedicineManagementComponent, AddMedicineComponent, EditMedicineComponent } from './role/admin/medicine-management/index';
import { ClinicManagementComponent } from './role/admin/clinic-management/index';
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
                path: 'start-working'
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
                path: 'manage-workday'
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
                path: 'personnel-management/add-doctor',
                component: AddDoctorComponent
            },
            {
                path: 'personnel-management/add-patient',
                component: AddPatientComponent
            },
            {
                path: 'personnel-management/add-nurse',
                component: AddNurseComponent
            },
            {
                path: 'personnel-management/add-pharmacist',
                component: AddPharmacistComponent
            },
            {
                path: 'personnel-management/add-staff',
                component: AddStaffComponent
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
            }
        ]
    }
]

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);