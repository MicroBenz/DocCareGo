// Angular 2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth, JwtHelper } from 'angular2-jwt';

// Components Declaration
// App & Nav Components
import { AppComponent } from './app.component';
import { AppComponentWithNav } from './app.component.withnav';
import { NavComponent } from './nav/nav.component';

// Auth Components
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';

// Patient Components
import { MakeAppointmentComponent } from './patient/make.appointment.component';
import { PatientLandingComponent } from './patient/patient.landing.component';
import { ViewAppointmentComponent } from './patient/view.appointment.component';

// Routing
import { routing, appRoutingProviders } from './app.routing';

// Service
import { AuthService } from './shared/service/auth.service';
import { Router } from '@angular/router';
import { CanActivateViaAuthGuard } from './auth/auth.guard';
import { PatientOnlyRoute } from './auth/guard/patient.guard';
import { NurseOnlyRoute } from './auth/guard/nurse.guard';
import { DoctorOnlyRoute } from './auth/guard/doctor.guard';
import { PharmacistOnlyRoute } from './auth/guard/pharmacist.guard';
import { StaffOnlyRoute } from './auth/guard/staff.guard';
import { NonLoggedInRoute } from './auth/guard/non.logged.in.guard';
import { AppointmentTableCompact } from './shared/appointment/appointment.table.compact.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        AppComponentWithNav,
        NavComponent,

        LoginComponent,
        RegisterComponent,

        AppointmentTableCompact,
        MakeAppointmentComponent,
        PatientLandingComponent,
        ViewAppointmentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        PatientOnlyRoute,
        DoctorOnlyRoute,
        NurseOnlyRoute,
        PharmacistOnlyRoute,
        StaffOnlyRoute,
        NonLoggedInRoute,
        JwtHelper,
        provideAuth({
            headerName: 'x-access-token',
            tokenName: 'doccareGoToken',
            tokenGetter: (
                () => window.localStorage.getItem('doccareGoToken')
            )
        }),
        appRoutingProviders,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        AuthService
    ]
})
export class AppModule {
    constructor() {
        console.log(window.localStorage.getItem('doccareGoToken'));
    }
}