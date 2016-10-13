// Angular 2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth, JwtHelper } from 'angular2-jwt';

// Components Declaration
// App & Nav Components
import { AppComponent, AppComponentWithNav} from './main/index';
import { NavComponent } from './nav/nav.component';

// Auth Components
import { LoginComponent, RegisterComponent } from './auth/index';

// Patient Components
import { PatientLandingComponent, MakeAppointmentComponent, ViewAppointmentComponent } from './role/patient/index';
// Routing
import { routing, appRoutingProviders } from './app.routing';

// Service
import { AuthService } from './shared/service/auth.service';
import { Router } from '@angular/router';
import { PatientOnlyRoute, NurseOnlyRoute, DoctorOnlyRoute, PharmacistOnlyRoute, StaffOnlyRoute, NonLoggedInRoute } from './auth/guard/index';

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
        console.log('[AppModule] current token: ', window.localStorage.getItem('doccareGoToken'));
    }
}