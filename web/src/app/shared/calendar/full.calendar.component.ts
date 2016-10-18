import { Component, AfterViewInit } from '@angular/core';
@Component({
    selector: 'full-calendar',
    template: '<div id="calendar"></div>'
})

export class FullCalendarComponent implements AfterViewInit {
    ngAfterViewInit () {
        jQuery('#calendar').fullCalendar({});
    }
    
}