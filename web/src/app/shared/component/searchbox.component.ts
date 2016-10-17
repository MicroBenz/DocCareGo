import { Component, Input } from '@angular/core';

@Component({
    selector: 'searchbox',
    template: `
        <label class="label">{{searchBoxLabel}}</label>
        <p class="control">
            <input class="input" type="text" placeholder="">
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