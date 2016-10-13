import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <apps-nav></apps-nav>
        <router-outlet></router-outlet>
    `,
    styles: [`
        body {
            padding-top: 115px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AppComponentWithNav {}