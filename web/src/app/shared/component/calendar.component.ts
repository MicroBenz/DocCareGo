import { Component, AfterViewInit } from '@angular/core';
@Component({
    selector: 'calendar',
    template: '<button id="test">Test jQuery</button>'
})

export class CalendarComponent implements AfterViewInit {
    ngAfterViewInit () {
        jQuery('#test').click((event) => {
            console.log('test');
        })
    }
    
}