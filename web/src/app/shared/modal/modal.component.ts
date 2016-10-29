import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'modal-dialog',
    templateUrl: './modal.view.html',
    styles: [`
        .modal-card .modal-card-body {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            text-align: center;            
        }
        .modal-card .modal-card-body img {
            width: 150px;
            margin-bottom: 15px; 
        }
        .modal-card .modal-card-foot {
            justify-content: center;
            align-items: center;
        }
    `]
})
export class ModalComponent {
    @Input('description') description = '';
    @Input('confirmFn') confirmFn;
    @Input('cancelFn') cancelFn;
    @Input('confirmText') confirmText = 'ยืนยัน';
    @Input('cancelText') cancelText = 'ยกเลิก';
    @Input('isShowFlag') isShowFlag = false;    
    @Output('isShowFlagChange') isShowFlagChange = new EventEmitter<boolean>();
    @Output('onFunctionSucceed') onFunctionSucceed = new EventEmitter<any>();
    
    hideModal () {
        this.isShowFlagChange.emit(false);
        this.isShowFlag = false;
    }
}