import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <apps-nav></apps-nav>
        <router-outlet></router-outlet>
    `,
    styles: [`
        
    `
    ]
})
export class AppComponentWithNav {}