import { Component, Input } from '@angular/core';
@Component({
    selector: 'patient-allergy',
    templateUrl: './patient.allergy.view.html',
    styles: [`
        .allergy-title {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 18px;
        }
        .tag {
            margin-bottom: 10px;
        }
        .medicine-tab {
            display: inline-block;
            margin-right: 5px;
        }
        .patient-no-allergy {
            padding-top: 10px;
        }
        
    `]
})
export class PatientAllergyComponent {
    @Input('medicineAllegyList') medicineAllegyList;
}