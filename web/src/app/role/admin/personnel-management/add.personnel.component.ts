import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'add-personnel',
    templateUrl: './add.personnel.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .role-select-wrapper {
            margin-top: 10px;
            margin-bottom: 15px;
        }
    `]
})
export class AddPersonnelComponent implements OnInit {
    public selectedRole: string;
    public isSelected: boolean;

    ngOnInit () {
        // this.selectedRole = '';
        // this.isSelected = false;
        this.selectedRole = 'doctor';
        this.isSelected = true;
    }
}