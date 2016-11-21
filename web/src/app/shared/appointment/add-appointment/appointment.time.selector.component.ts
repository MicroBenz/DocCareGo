import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
// import * as moment from 'moment';

@Component({
    selector: 'appointment-time-selector',
    templateUrl: './appointment.time.selector.view.html',
    styles: [`
        .display-date {
            display: inline-block;
        }
        .button-wrapper .fa {
            font-size: 35px;
        }
    `]
})
export class AppointmentTimeSelectorComponent implements OnInit, OnChanges {
    @Input('timeSlot') timeSlot;
    @Output('onSelectedTime') onSelectedTime = new EventEmitter();

    public currentIndex: number;
    public currentDateDisplay: string;
    public currentTimeDisplay: string;
    public isShowSelector: boolean;

    ngOnInit () {
        this.currentIndex = 0;
        this.currentDateDisplay = '';
        this.currentTimeDisplay = '';
        this.isShowSelector = false;
    }

    ngOnChanges(changes) {
        console.log(changes);
        if (changes['timeSlot'].currentValue.length !== 0) {
            this.isShowSelector = true;
            this.setCurrentTimeDisplay(0);
        }
    }

    private setCurrentTimeDisplay (index) {
        this.currentDateDisplay = this.timeSlot[index]['displayDate'];
        this.currentTimeDisplay = this.timeSlot[index]['time'];        
    }
    chooseThisTimeSlot () {
        this.onSelectedTime.emit(this.timeSlot[this.currentIndex]);
    }

    getNextTimeSlot () {
        this.currentIndex += 1;
        this.setCurrentTimeDisplay(this.currentIndex);
    }

}