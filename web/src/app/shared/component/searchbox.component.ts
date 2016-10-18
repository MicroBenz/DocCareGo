import { Component, Input } from '@angular/core';

@Component({
    selector: 'search-box',
    template: `
        <label class="label">{{searchBoxLabel}}</label>
        <p class="control has-icon has-icon-right">
            <input class="input" type="text" placeholder="">
            <i class="fa fa-spinner"></i>
        </p>
    `,
    styles: [`
        input {
            border-radius: 0px;
        }
    `]
})
export class SearchBoxComponent {
    @Input('searchBoxLabel') searchBoxLabel = 'label';
}