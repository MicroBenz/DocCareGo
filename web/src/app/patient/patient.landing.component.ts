import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '<patient-landing></patient-landing>',
    template: `
        <h1>Welcome Patient</h1>
    `
})
export class PatientLandingComponent {
    constructor(private router: Router) {
        console.log(this.router.url);
    }
}