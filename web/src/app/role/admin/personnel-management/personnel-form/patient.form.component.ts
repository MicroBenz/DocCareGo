import { Component, Input } from '@angular/core';
@Component({
    selector: 'patient-form',
    templateUrl: './patient.form.view.html',
    styles: [`
        .button-static {
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 5px;
            display: inline-block;
        }
    `]
})
export class PatientFormComponent {
    @Input('formData') formData;
    @Input('isNeedHN') isNeedHN = true;
    public aMedicine;
    public medicines: String[] = [];
    public med;

    addNoMedicine() {
        this.medicines = this.formData['noMedicines'];
        if(this.formData['noMedicines'] === undefined || this.formData['noMedicines'] === null || this.formData['noMedicines'] === []) {
            this.medicines = [];
        }
        if(this.aMedicine === null || this.aMedicine === '' || this.aMedicine === undefined) {
            return;
        }
        this.med = "this.medicines";
        if(this.medicines.find(item => item === this.aMedicine))
        {
            return;
        }
        this.medicines.push(this.aMedicine);
        this.formData['noMedicines'] = this.medicines;
        
    }

    deleteNoMedicine(medicine: String) {
        var index = this.medicines.findIndex(item => item[0] === medicine);
        this.medicines.splice(index, 1);
        this.formData['noMedicines'] = this.medicines;
    }
}