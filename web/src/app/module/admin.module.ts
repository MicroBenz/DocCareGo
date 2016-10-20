import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminOnlyRoute } from './../auth/guard/admin.guard';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [

    ],
    exports: [

    ],
    providers: [
        AdminOnlyRoute
    ]
})
export class AdminModule {}