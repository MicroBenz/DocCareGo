import { Component, Input } from '@angular/core';

@Component({
    selector: 'clinic-form',
    templateUrl: './clinic.form.view.html'
})

export class ClinicFormComponent {
    @Input('formData') formData = {
        name: '',
        description: ''
    };
}