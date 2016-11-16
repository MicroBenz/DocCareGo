import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

    constructor(private router: Router, private title: Title) {}

    public editInfo (hn) {
        console.log('EDIT ', this.role, hn);
        let editRoute = `/admin/personnel-management/edit-${this.role}/${hn}`;
        console.log(editRoute);
        this.router.navigateByUrl(editRoute);
    }

    public deleteItem (hn) {
        console.log('EDIT ', this.role);        
    }
}