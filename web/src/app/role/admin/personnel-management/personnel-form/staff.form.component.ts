import { Component, Input } from '@angular/core';
@Component({
    selector: 'staff-form',
    templateUrl: './staff.form.view.html'
})
export class StaffFormComponent {
    @Input('formData') formData;
}