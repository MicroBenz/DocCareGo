import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PopoverModule } from 'ng2-popover';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { DataService } from './shared/data.service';
import { AuthService } from './shared/auth.service';
import { AppComponentWithNav } from './app.component.withnav';
import { NavComponent } from './nav/nav.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        AppComponentWithNav,
        LoginComponent,
        RegisterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PopoverModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        DataService,
        AuthService
    ]
})
export class AppModule {}