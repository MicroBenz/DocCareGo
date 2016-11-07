import { Component, Input } from '@angular/core';
@Component({
    selector: 'personnel-table',
    templateUrl: './personnel.table.view.html',
    styles: [`
        .table .id-column {
            width: 13%;
        }
        .table .action-column {
            width: 24%;
        }

        .table tbody tr td .fa {
            padding-right: 5px;
        }
    `]
})
export class PersonnelTableComponent {
    @Input('personnelList') personnelList;
    @Input('role') role;

    public editInfo (id) {
        console.log('EDIT ', this.role);
    }

    public deleteItem (id) {
        console.log('EDIT ', this.role);        
    }
}