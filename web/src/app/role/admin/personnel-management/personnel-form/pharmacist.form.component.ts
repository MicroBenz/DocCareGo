import { Component, Input } from '@angular/core';

@Component({
    selector: 'pharmacist-form',
    templateUrl: './pharmacist.form.view.html'
})
export class PharmacistFormComponent {
    @Input('formData') formData; 
}