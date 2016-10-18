// Angular 2 Libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth, JwtHelper } from 'angular2-jwt';

// Components
import { AppComponent, AppComponentWithNavComponent } from './main/index';
import { NavComponent } from './nav/nav.component';
import { LoginComponent, RegisterComponent } from './auth/index';
import { MakeAppointmentComponent, ViewAppointmentComponent, AppointmentAccordionComponent, AppointmentTableSelectionComponent } from './role/patient/index';
import { AppointmentManagementComponent, MakeAppointmentByStaffComponent } from './role/staff/index';
import { ViewTodayPatientComponent, RecordPatientDetailComponent } from './role/nurse/index';
import { ViewTodayPrescriptionComponent, PatientPrescriptionComponent } from './role/pharmacist/index';
import { ManageWorkdayComponent } from './role/doctor/index';

// Shared Components
import { AppointmentTableCompactComponent } from './shared/appointment/appointment.table.compact.component';
import { AppointmentTableComponent } from './shared/appointment/appointment.table.component';
import { MiniCalendarComponent, SearchBoxComponent, PatientListComponent } from './shared/component/index';
import { MakeAppointmentFormComponent } from './shared/appointment/make.appointment.form.component';
import { FullCalendarComponent } from './shared/calendar/full.calendar.component';

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
        /* Main Components */
        AppComponent,
        AppComponentWithNavComponent,
        NavComponent,

        /* Auth Components */
        LoginComponent,
        RegisterComponent,

        /* Shared Components */
        MiniCalendarComponent,
        SearchBoxComponent,
        PatientListComponent,
        FullCalendarComponent,        

        /* Shared Components -> Appointment related */
        MakeAppointmentFormComponent,
        AppointmentTableCompactComponent,
        AppointmentTableComponent,        

        /* Patient Components */
        MakeAppointmentComponent,        
        ViewAppointmentComponent,        
        AppointmentTableSelectionComponent,
        AppointmentAccordionComponent,

        /* Staff Components */
        AppointmentManagementComponent,
        MakeAppointmentByStaffComponent,

        /* Nurse Components */
        ViewTodayPatientComponent,
        PatientListComponent,
        RecordPatientDetailComponent,

        /* Pharmacist Components */
        ViewTodayPrescriptionComponent,
        PatientPrescriptionComponent,

        /* Doctor Components */
        ManageWorkdayComponent
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