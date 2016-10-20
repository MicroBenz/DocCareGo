import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NonLoggedInRoute } from './../auth/guard/non.logged.in.guard';
import { LoginComponent } from './../auth/login.component';
import { RegisterComponent } from './../auth/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        NonLoggedInRoute
    ]
})
export class AuthModule {}