// Angular 2 Libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideAuth, JwtHelper } from 'angular2-jwt';

// Modules
import { PatientModule } from './module/patient.module';
import { DoctorModule } from './module/doctor.module';
import { NurseModule } from './module/nurse.module';
import { PharmacistModule } from './module/pharmacist.module';
import { StaffModule } from './module/staff.module';
import { AdminModule } from './module/admin.module';
import { SharedModule } from './module/shared.module';
import { AuthModule } from './module/auth.module';

// Components
import { AppComponent, AppComponentWithNavComponent } from './main/index';
import { NavComponent } from './nav/nav.component';

// Routing
import { routing, appRoutingProviders } from './app.routing';

// Service
import { AuthService } from './shared/service/auth.service';
import { DataService } from './shared/service/data.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        AppComponentWithNavComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AuthModule,
        SharedModule,
        PatientModule,
        DoctorModule,
        NurseModule,
        PharmacistModule,
        StaffModule,
        AdminModule
    ],
    providers: [
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
        AuthService,
        DataService
    ]
})
export class AppModule {
    constructor() {
        console.log('[AppModule] user token: ', window.localStorage.getItem('doccareGoToken'));     
    }
}