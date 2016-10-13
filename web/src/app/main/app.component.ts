import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <router-outlet></router-outlet>
    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: table;
        }
    `]
})
export class AppComponent {}