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
            <i class="fa" *ngIf="isSearching">
                <img src="assets/img/loading.gif">
            </i>
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
    public isSearching = false;
    ngOnInit () {
        if (this.serviceFn === undefined)
            return;
        this.searchKeyControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .flatMap(
                (searchKey) => {
                    this.isSearching = true;
                    return this.serviceFn(searchKey);
                }
            )
            .subscribe(
                (searchResult) => {
                    this.isSearching = false;
                    console.log('RES ', searchResult);
                    this.onSearchResult.emit(searchResult);
                },
                (error) => {
                    console.log('Search Error: ', error);
                }
            )
    }

}