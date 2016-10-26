import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'search-box',
    template: `
        <label class="label">{{searchBoxLabel}}</label>
        <p class="control has-icon has-icon-right">
            <input class="input" type="text" placeholder=""
                [formControl]="searchKeyControl">
            <i class="fa fa-spinner"></i>
        </p>
    `,
    styles: [`
        input {
            border-radius: 0px;
        }
    `]
})
export class SearchBoxComponent implements OnInit {
    @Input('searchBoxLabel') searchBoxLabel = 'label';
    @Input('serviceFn') serviceFn: Function;
    @Output('onSearchResult') onSearchResult = new EventEmitter();

    public searchKeyControl = new FormControl();
    ngOnInit () {
        this.searchKeyControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .flatMap(
                (searchKey) => {
                    return this.serviceFn(searchKey);
                }
            )
            .subscribe(
                (searchResult) => {
                    console.log('RES ', searchResult);
                    this.onSearchResult.emit(searchResult);
                }
            )
    }

}