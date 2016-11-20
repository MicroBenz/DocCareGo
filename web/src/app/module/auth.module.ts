import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NonLoggedInRoute } from './../auth/guard/non.logged.in.guard';
import { LoginComponent, RegisterComponent, NewPatientRegisterComponent } from './../auth/index';
import { AdminModule } from './admin.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        NewPatientRegisterComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        NewPatientRegisterComponent        
    ],
    providers: [
        NonLoggedInRoute
    ]
})
export class AuthModule {}