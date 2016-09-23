import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { DataService } from './shared/data.service';
import { AuthService } from './shared/auth.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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