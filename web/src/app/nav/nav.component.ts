import { Component } from '@angular/core';

@Component({
    selector: 'apps-nav',
    templateUrl: './nav.view.html',
    styles: [`
        .profile-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            color: #fff;
            line-height: 40px;
            text-align: center;
        }
        .profile-circle a {
            color: #ffffff;
            cursor: default;
        }
        .profile-name, .profile-circle{
            display: inline-block;
        }
    `]
})
export class NavComponent {}