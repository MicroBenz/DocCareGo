import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/service/auth.service';
import { DataService } from '../../shared/service/data.service';
import { SCHEDULE_ENDPOINT } from '../../config/api.config';
import { ADD_WORKDAY_TITLE } from '../../config/title.config';

@Component({
    selector: 'add-workday',
    templateUrl: './add.workday.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .workday-box {
            color: #ffffff;
        }
        .workday-box.disabled {
            opacity: 0.5;
        }
        .workday-box.sunday {
            background-color: #e03333;
        }
        .workday-box.monday {
            background-color: #f4c535;
        }
        .workday-box.tuesday {
            background-color: #e151c7;
        }
        .workday-box.wednesday {
            background-color: #66bf06;
        }
        .workday-box.thursday {
            background-color: #eb8e36;
        }
        .workday-box.friday {
            background-color: #006af5;
        }
        .workday-box.saturday {
            background-color: #4d2cc3;
        }
        .workday-box h1 {
            font-size: 26px;
        }
        .workday-box .icon {
            position: absolute;
            top: 20px;
            right: 15px;
        }
        .workday-box .subtitle {
            margin-bottom: 0px;
        }
    `]
})
export class AddWorkdayComponent implements OnInit {
    @Input('doctorHN') doctorHN = this.authService.getUserID();
    public selectedTime;
    public selectedState;
    public allTimeSlot;
    public isShowConfirm;
    public confirmDialogText;

    private timeSlot = ['9:00 - 11:30', '13:00 - 15:30'];
    private dayMapping = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private toThaiDayMapping = {
        'Sunday': 'อาทิตย์',
        'Monday': 'จันทร์',
        'Tuesday': 'อังคาร',
        'Wednesday': 'พุธ',
        'Thursday': 'พฤหัสบดี',
        'Friday': 'ศุกร์',
        'Saturday': 'เสาร์',        
    };
    constructor(private authService: AuthService, private dataService: DataService, private title: Title, private router: Router) {}

    ngOnInit () { 
        this.title.setTitle(ADD_WORKDAY_TITLE);
        this.isShowConfirm = false;
        this.selectedTime = [];        
        this.createSelectedState();    
        this.dataService.getData(`${SCHEDULE_ENDPOINT}/${this.doctorHN}`)
            .map((schedules: Array<Object>) => {
                return schedules.map(
                    (timeSlot) => ({
                        day: timeSlot['day'],
                        time: timeSlot['time']
                    })
                );
            })
            .subscribe(this.createAvailableTimeSlot);
    }

    private createAvailableTimeSlot = (schedules: Array<Object>) => {
        let disabledSlot = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            disabledSlot[i] = [false, false];
        }
        for (let schedule of schedules) {
            let dayIdx = this.dayMapping.indexOf(schedule['day']);
            let slotIdx = schedule['time'] === 'AM'? 0: 1;
            disabledSlot[dayIdx][slotIdx] = true;
        }
        this.allTimeSlot = [
            [
                {dayLabel: 'อาทิตย์เช้า', timeSlot: this.timeSlot[0], class: 'sunday', dayIdx: 0, timeIdx: 0, isDisable: disabledSlot[0][0]},
                {dayLabel: 'อาทิตย์บ่าย', timeSlot: this.timeSlot[1], class: 'sunday', dayIdx: 0, timeIdx: 1, isDisable: disabledSlot[0][1]},
                {dayLabel: 'จันทร์เช้า', timeSlot: this.timeSlot[0], class: 'monday', dayIdx: 1, timeIdx: 0, isDisable: disabledSlot[1][0]},
                {dayLabel: 'จันทร์บ่าย', timeSlot: this.timeSlot[1], class: 'monday', dayIdx: 1, timeIdx: 1, isDisable: disabledSlot[1][1]}
            ],
            [
                {dayLabel: 'อังคารเช้า', timeSlot: this.timeSlot[0], class: 'tuesday', dayIdx: 2, timeIdx: 0, isDisable: disabledSlot[2][0]},
                {dayLabel: 'อังคารบ่าย', timeSlot: this.timeSlot[1], class: 'tuesday', dayIdx: 2, timeIdx: 1, isDisable: disabledSlot[2][1]},
                {dayLabel: 'พุธเช้า', timeSlot: this.timeSlot[0], class: 'wednesday', dayIdx: 3, timeIdx: 0, isDisable: disabledSlot[3][0]},
                {dayLabel: 'พุธบ่าย', timeSlot: this.timeSlot[1], class: 'wednesday', dayIdx: 3, timeIdx: 1, isDisable: disabledSlot[3][1]}
            ],
            [
                {dayLabel: 'พฤหัสบดีเช้า', timeSlot: this.timeSlot[0], class: 'thursday', dayIdx: 4, timeIdx: 0, isDisable: disabledSlot[4][0]},
                {dayLabel: 'พฤหัสบดีบ่าย', timeSlot: this.timeSlot[1], class: 'thursday', dayIdx: 4, timeIdx: 1, isDisable: disabledSlot[4][1]},
                {dayLabel: 'ศุกร์เช้า', timeSlot: this.timeSlot[0], class: 'friday', dayIdx: 5, timeIdx: 0, isDisable: disabledSlot[5][0]},
                {dayLabel: 'ศุกร์บ่าย', timeSlot: this.timeSlot[1], class: 'friday', dayIdx: 5, timeIdx: 1, isDisable: disabledSlot[5][1]}
            ],
            [
                {dayLabel: 'เสาร์เช้า', timeSlot: this.timeSlot[0], class: 'saturday', dayIdx: 6, timeIdx: 0, isDisable: disabledSlot[6][0]},
                {dayLabel: 'เสาร์บ่าย', timeSlot: this.timeSlot[1], class: 'saturday', dayIdx: 6, timeIdx: 1, isDisable: disabledSlot[6][1]}
            ]
            
        ]
    }

    private createSelectedState () {
        this.selectedState = [];
        for (let i = 0 ; i < 7 ; i += 1) {
            this.selectedState[i] = [false, false];
        }
    }

    toggleSelect (day, slot) {
        this.selectedState[day][slot] = !this.selectedState[day][slot];
        this.updateSelection();
    }

    private updateSelection () {
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
        this.selectedTime = selectedArr;
        this.updateDialogText();
    }

    private updateDialogText () {
        let selectedTimeArr = [];
        let selectedTimeHTML = '';
        let count = 0;
        for (let i = 0 ; i < this.selectedTime.length ; i += 1) {
            let thaiDay = 'วัน' + this.toThaiDayMapping[this.selectedTime[i].day];
            let slot = this.selectedTime[i].time === 'AM'? 'เช้า': 'บ่าย';
            selectedTimeArr.push(`${thaiDay}${slot}`);
            count += 1;
            if (count == 2 || (count === 1 && i === this.selectedTime.length - 1)) {
                count = 0;
                selectedTimeHTML += `<p class="subtitle is-5">${selectedTimeArr.join(', ')}</p>`;
                selectedTimeArr = [];
            }
        }
        this.confirmDialogText = `
            <h1 class="title">ตรวจสอบวันออกตรวจที่ต้องการเพิ่มอีกครั้ง</h1>
            ${selectedTimeHTML}
        `;
    }

    addWorkday = () => {
        let requestBody = {
            doctor: this.doctorHN,
            schedules: this.selectedTime
        };
        this.dataService.saveData(SCHEDULE_ENDPOINT, requestBody)
            .subscribe(
                (success) => {
                    this.navigateToMainDoctor();
                }
            )
    }

    dismissModal = () => {
        this.isShowConfirm = false;
    }

    navigateToMainDoctor = () => {
        this.router.navigateByUrl('/doctor');
    }
}