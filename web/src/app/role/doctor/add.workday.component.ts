import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
@Component({
    selector: 'add-workday',
    templateUrl: './add.workday.view.html',
    styleUrls: ['add.workday.style.css']
})
export class AddWorkdayComponent implements OnInit {
    public timeSlot;
    public selectedSlot;
    constructor(private authService: AuthService) {}

    ngOnInit () {
        console.log(this.authService.getUserID());
        this.timeSlot = ['8:00 - 11:00', '13:00 - 16:00'];
        this.selectedSlot = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            this.selectedSlot[i] = [false, false];
        }
        console.log(this.selectedSlot);
    }

    toggleSelect (day, slot) {
        this.selectedSlot[day][slot] = !this.selectedSlot[day][slot];
    }
}