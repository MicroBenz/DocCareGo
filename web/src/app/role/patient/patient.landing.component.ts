import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/service/auth.service';

@Component({
    selector: 'patient-landing',
    template: `
        <div class="container">
            <h1>สวัสดีคุณ จอห์น ชาวไร่</h1>
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <h1 class="title">นัดหมายแพทย์</h1>                        
                    </div>
                </div>
                <div class="tile is-parent">
                    <h1>BB</h1>
                </div>
            </div>
        </div>
    `,
    styles: [`
        :host {
            text-align: center;
        }
    `]
})
export class PatientLandingComponent {
    constructor(private router: Router, private authService: AuthService) {

    }
}