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
    @Input('personnelList') personnelList = [];

    public roleMapping = {
        patient: 'ผู้ป่วย',
        doctor: 'แพทย์',
        nurse: 'พยาบาล',
        pharmacist: 'เภสัชกร',
        staff: 'เจ้าหน้าที่'
    };

    public editInfo (id, role) {

    }

    public deleteItem (id, role) {

    }
}