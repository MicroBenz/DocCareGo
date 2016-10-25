import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'modal-dialog',
    templateUrl: './modal.view.html'
})
export class ModalComponent {
    @Input('description') description = '';
    @Input('confirmFn') confirmFn;
    @Input('cancelFn') cancelFn;
    @Input('isShowFlag') isShowFlag = false;
    @Input('confirmText') confirmText = 'ยืนยัน';
    @Input('cancelText') cancelText = 'ยกเลิก';
    @Output('isShowFlagChange') isShowFlagChange = new EventEmitter<boolean>();

    hideModal () {
        this.isShowFlagChange.emit(false);
        this.isShowFlag = false;
    }
}