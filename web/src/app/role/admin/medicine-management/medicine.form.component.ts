import { Component, Input } from '@angular/core';

@Component({
    selector: 'medicine-form',
    templateUrl: './medicine.form.view.html'
})
export class MedicineFormComponent {
    @Input('formData') formData = {
        name: '',
        description: ''    
    };
}