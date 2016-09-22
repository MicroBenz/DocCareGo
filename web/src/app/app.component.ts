import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <div>
            <router-outlet></router-outlet>            
        </div>
    `,
    styles: [`
        html, body {
            width: 100%;
            height: 100%;
            background-color: #ff0000;
        }
    `]
})
export class AppComponent {}