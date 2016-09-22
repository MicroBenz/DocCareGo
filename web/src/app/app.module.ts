import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule {}