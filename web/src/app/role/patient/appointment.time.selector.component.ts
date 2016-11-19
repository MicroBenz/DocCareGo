import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'appointment-time-selector',
    templateUrl: './appointment.time.selector.view.html',
    styles: [`
        .display-date {
            display: inline-block;
        }
    `]
})
export class AppointmentTimeSelectorComponent implements OnInit, OnChanges {
    @Input('timeSlot') timeSlot;
    public currentIndex: number;
    public currentDateDisplay: string;
    public currentTimeDisplay: string;

    ngOnInit () {
        this.currentIndex = 0;
        this.currentDateDisplay = '';
        this.currentTimeDisplay = '';
    }

    ngOnChanges(changes) {
        console.log(changes);
        if (changes['timeSlot'].currentValue.length !== 0) {
            this.setCurrentTimeDisplay(0);
        }
    }

    private setCurrentTimeDisplay (index) {
        this.currentDateDisplay = this.timeSlot[index]['displayDate'];
        this.currentTimeDisplay = this.timeSlot[index]['time'];        
    }
    chooseThisTimeSlot () {

    }

    getNextTimeSlot () {
        this.currentIndex += 1;
        this.setCurrentTimeDisplay(this.currentIndex);
    }

}