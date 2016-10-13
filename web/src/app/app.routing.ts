import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Apps Components
import { AppComponent, AppComponentWithNav } from './main/index';
import { LoginComponent, RegisterComponent } from './auth/index';

// Patient Components
import { PatientLandingComponent, MakeAppointmentComponent, ViewAppointmentComponent } from './role/patient/index';

// Auth Guard
import { PatientOnlyRoute, DoctorOnlyRoute, NurseOnlyRoute, StaffOnlyRoute, PharmacistOnlyRoute, NonLoggedInRoute } from './auth/guard/index';

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
        component: AppComponentWithNav,
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
        component: AppComponentWithNav,
        canActivate: [
            DoctorOnlyRoute
        ],
        children: [
            {
                path: ''
            },
            {
                path: 'manage-workday'
            },
            {
                path: 'start-working'
            }
        ]
    },
    {
        path: 'nurse',
        component: AppComponentWithNav,
        canActivate: [
            NurseOnlyRoute
        ],
        children: [
            {
                path: ''
            },
            {
                path: 'view-today-patient'
            }
        ]
    },
    {
        path: 'staff',
        component: AppComponentWithNav,
        canActivate: [
            StaffOnlyRoute
        ],
        children: [
            {
                path: ''
            },
            {
                path: 'manage-appointment'
            },
            {
                path: 'manage-workday'
            }
        ]
    },
    {
        path: 'pharmacist',
        component: AppComponentWithNav,
        canActivate: [
            PharmacistOnlyRoute
        ],
        children: [
            {
                path: ''
            },
            {
                path: 'view-prescription',
            }
        ]
    }
]

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);