import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'login.view.html',
    styles: [`
        :host {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
        #login-view {
            width: 100%;
        }
        #login-box {
            background-color: #ffffff;
            color: #6f5555;
            width: 400px;
            padding: 30px;
        }
    `]
})
export class LoginComponent {}