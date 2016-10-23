import { Component, OnInit, AfterViewInit } from '@angular/core';
@Component({
    selector: 'full-calendar',
    template: `
        <div id="calendar"></div>
        <div class="modal" [class.is-active]="testClass">
            <div class="modal-background" (click)="closeModal()"></div>
            <div class="modal-content">
                <h1>ทดสอบ Modal...data binding ด้านล่าง</h1>
                <p>{{testBinding}}</p>
            </div>
            <button class="modal-close" (click)="closeModal()"></button>
        </div>
    `
})

export class FullCalendarComponent implements OnInit, AfterViewInit {
    public testClass: boolean;
    public testBinding: string;

    constructor() {}

    public closeModal () {
        this.testClass = false;
        console.log(this.testClass);
    }

    ngOnInit () {
        this.testClass = false;
        this.testBinding = '';
    }

    ngAfterViewInit () {
        jQuery('#calendar').fullCalendar({
            height: 500,
            events: [
                {
                    title: 'ทดสอบ',
                    start: '2016-10-23'
                },
                {
                    title: 'ทดสอบอันที่สอง',
                    start: '2016-10-25'
                }
            ],
            eventClick: this.onSelectEvent
        });

        jQuery('#calendar .fc-toolbar .fc-right button')
            .removeClass()
            .addClass('button');
    }
    
    public onSelectEvent = (callEvent, jsEvent, view) => {
        console.log(jsEvent);
        console.log('Before set in event ',this.testClass);
        this.testBinding = callEvent.title;
        this.testClass = true;
        console.log('After set in event ',this.testClass);
    }
}