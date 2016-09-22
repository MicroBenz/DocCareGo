import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <h1>Hello</h1>
        <a routerLink="/login">Go to Login</a>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}