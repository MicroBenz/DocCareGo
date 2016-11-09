import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
@Component({
    selector: 'add-workday',
    templateUrl: './add.workday.view.html',
    styleUrls: ['add.workday.style.css']
})
export class AddWorkdayComponent implements OnInit {
    private timeSlot = ['8:00 - 11:00', '13:00 - 16:00'];
    public selectedSlot;
    public allTimeSlot;

    constructor(private authService: AuthService) {}

    ngOnInit () {
        console.log(this.authService.getUserID());
        this.allTimeSlot = [
            [
                {dayLabel: 'อาทิตย์เช้า', timeSlot: this.timeSlot[0], class: 'sunday', dayIdx: 0, timeIdx: 0},
                {dayLabel: 'อาทิตย์บ่าย', timeSlot: this.timeSlot[1], class: 'sunday', dayIdx: 0, timeIdx: 1},
                {dayLabel: 'จันทร์เช้า', timeSlot: this.timeSlot[0], class: 'monday disabled', dayIdx: 1, timeIdx: 0},
                {dayLabel: 'จันทร์บ่าย', timeSlot: this.timeSlot[1], class: 'monday', dayIdx: 1, timeIdx: 1}
            ],
            [
                {dayLabel: 'อังคารเช้า', timeSlot: this.timeSlot[0], class: 'tuesday', dayIdx: 2, timeIdx: 0},
                {dayLabel: 'อังคารบ่าย', timeSlot: this.timeSlot[1], class: 'tuesday', dayIdx: 2, timeIdx: 1},
                {dayLabel: 'พุธเช้า', timeSlot: this.timeSlot[0], class: 'wednesday', dayIdx: 3, timeIdx: 0},
                {dayLabel: 'พุธบ่าย', timeSlot: this.timeSlot[1], class: 'wednesday', dayIdx: 3, timeIdx: 1}
            ],
            [
                {dayLabel: 'พฤหัสบดีเช้า', timeSlot: this.timeSlot[0], class: 'thursday', dayIdx: 4, timeIdx: 0},
                {dayLabel: 'พฤหัสบดีบ่าย', timeSlot: this.timeSlot[1], class: 'thursday', dayIdx: 4, timeIdx: 1},
                {dayLabel: 'ศุกร์เช้า', timeSlot: this.timeSlot[0], class: 'friday', dayIdx: 5, timeIdx: 0},
                {dayLabel: 'ศุกร์บ่าย', timeSlot: this.timeSlot[1], class: 'friday', dayIdx: 5, timeIdx: 1}
            ],
            [
                {dayLabel: 'เสาร์เช้า', timeSlot: this.timeSlot[0], class: 'saturday', dayIdx: 6, timeIdx: 0},
                {dayLabel: 'เสาร์บ่าย', timeSlot: this.timeSlot[1], class: 'saturday', dayIdx: 6, timeIdx: 1}
            ]
            
        ]
        this.selectedSlot = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            this.selectedSlot[i] = [false, false];
        }
        console.log(this.selectedSlot);
    }

    toggleSelect (day, slot) {
        console.log(day, slot);
        this.selectedSlot[day][slot] = !this.selectedSlot[day][slot];
    }
}