import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Apps Components
import { AppComponent } from './app.component';
import { AppComponentWithNav } from './app.component.withnav';

// Auth Components
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';

// Patient Components
import { MakeAppointmentComponent } from './patient/make.appointment.component';
import { PatientLandingComponent } from './patient/patient.landing.component';
import { ViewAppointmentComponent } from './patient/view.appointment.component';
import { CanActivateViaAuthGuard } from './auth/auth.guard';
import { PatientOnlyRoute } from './auth/guard/patient.guard';
import { DoctorOnlyRoute } from './auth/guard/doctor.guard';
import { NurseOnlyRoute } from './auth/guard/nurse.guard';
import { StaffOnlyRoute } from './auth/guard/staff.guard';
import { PharmacistOnlyRoute } from './auth/guard/pharmacist.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
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
                component: PatientLandingComponent  
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