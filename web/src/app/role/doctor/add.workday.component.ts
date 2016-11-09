import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
@Component({
    selector: 'add-workday',
    templateUrl: './add.workday.view.html',
    styleUrls: ['add.workday.style.css']
})
export class AddWorkdayComponent implements OnInit {
    public selectedTime;
    public selectedState;
    public allTimeSlot;
    
    private timeSlot = ['8:00 - 11:00', '13:00 - 16:00'];
    private dayMapping = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor(private authService: AuthService) {}

    ngOnInit () {
        console.log(this.authService.getUserID());
        this.selectedTime = [];
        this.allTimeSlot = [
            [
                {dayLabel: 'อาทิตย์เช้า', timeSlot: this.timeSlot[0], class: 'sunday', dayIdx: 0, timeIdx: 0, isDisable: false},
                {dayLabel: 'อาทิตย์บ่าย', timeSlot: this.timeSlot[1], class: 'sunday', dayIdx: 0, timeIdx: 1, isDisable: false},
                {dayLabel: 'จันทร์เช้า', timeSlot: this.timeSlot[0], class: 'monday', dayIdx: 1, timeIdx: 0, isDisable: true},
                {dayLabel: 'จันทร์บ่าย', timeSlot: this.timeSlot[1], class: 'monday', dayIdx: 1, timeIdx: 1, isDisable: true}
            ],
            [
                {dayLabel: 'อังคารเช้า', timeSlot: this.timeSlot[0], class: 'tuesday', dayIdx: 2, timeIdx: 0, isDisable: false},
                {dayLabel: 'อังคารบ่าย', timeSlot: this.timeSlot[1], class: 'tuesday', dayIdx: 2, timeIdx: 1, isDisable: false},
                {dayLabel: 'พุธเช้า', timeSlot: this.timeSlot[0], class: 'wednesday', dayIdx: 3, timeIdx: 0, isDisable: false},
                {dayLabel: 'พุธบ่าย', timeSlot: this.timeSlot[1], class: 'wednesday', dayIdx: 3, timeIdx: 1, isDisable: false}
            ],
            [
                {dayLabel: 'พฤหัสบดีเช้า', timeSlot: this.timeSlot[0], class: 'thursday', dayIdx: 4, timeIdx: 0, isDisable: false},
                {dayLabel: 'พฤหัสบดีบ่าย', timeSlot: this.timeSlot[1], class: 'thursday', dayIdx: 4, timeIdx: 1, isDisable: false},
                {dayLabel: 'ศุกร์เช้า', timeSlot: this.timeSlot[0], class: 'friday', dayIdx: 5, timeIdx: 0, isDisable: false},
                {dayLabel: 'ศุกร์บ่าย', timeSlot: this.timeSlot[1], class: 'friday', dayIdx: 5, timeIdx: 1, isDisable: false}
            ],
            [
                {dayLabel: 'เสาร์เช้า', timeSlot: this.timeSlot[0], class: 'saturday', dayIdx: 6, timeIdx: 0, isDisable: false},
                {dayLabel: 'เสาร์บ่าย', timeSlot: this.timeSlot[1], class: 'saturday', dayIdx: 6, timeIdx: 1, isDisable: false}
            ]
            
        ]
        this.selectedState = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            this.selectedState[i] = [false, false];
        }
    }

    toggleSelect (day, slot) {
        this.selectedState[day][slot] = !this.selectedState[day][slot];
        this.updateSelection();
    }

    updateSelection () {
        let selectedArr = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            for (let j = 0; j < 2 ; j += 1) {
                if (this.selectedState[i][j]) {
                    selectedArr.push({
                        day: this.dayMapping[i],
                        time: j === 0? 'AM': 'PM'
                    });
                }
            }
        }
        console.log(selectedArr);
        this.selectedTime = selectedArr;
    }
}