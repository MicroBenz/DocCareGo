// Angular 2 Libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth, JwtHelper } from 'angular2-jwt';

// Components
import { AppComponent, AppComponentWithNav} from './main/index';
import { NavComponent } from './nav/nav.component';
import { LoginComponent, RegisterComponent } from './auth/index';
import { MakeAppointmentComponent, ViewAppointmentComponent, AppointmentAccordionComponent, AppointmentTableSelectionComponent } from './role/patient/index';
import { AppointmentManagementComponent } from './role/staff/appointment.management.component';

// Shared Components
import { AppointmentTableCompact } from './shared/appointment/appointment.table.compact.component';
import { AppointmentTableComponent } from './shared/appointment/appointment.table.component';
import { MiniCalendarComponent } from './shared/component/mini.calendar.component';
import { SearchBoxComponent } from './shared/component/searchbox.component';

// Routing
import { routing, appRoutingProviders } from './app.routing';
import { PatientOnlyRoute, NurseOnlyRoute, DoctorOnlyRoute, PharmacistOnlyRoute, StaffOnlyRoute, NonLoggedInRoute } from './auth/guard/index';

// Service
import { AuthService } from './shared/service/auth.service';

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

        MiniCalendarComponent,
        SearchBoxComponent,

        AppointmentTableCompact,
        MakeAppointmentComponent,
        ViewAppointmentComponent,
        AppointmentAccordionComponent,
        AppointmentTableSelectionComponent,

        AppointmentManagementComponent,
        AppointmentTableComponent
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