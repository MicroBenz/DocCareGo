import { Component } from '@angular/core';

@Component({
    selector: 'doccare-go-app',
    template: `
        <apps-nav></apps-nav>
        <div class="outlet-wrapper">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .outlet-wrapper {
            padding-top: 115px;
        }
    `]
})
export class AppComponentWithNavComponent {}