import { Component, OnInit } from '@angular/core';
/* FORMAT
{
    appointment: id,
    description: 'การวินัจฉัย',
    diseases: ,
    medicines: ,
    numberOfMedicines: [1,2]
}
*/
@Component({
    selector: 'diagnosis-form',
    templateUrl: './diagnosis.form.view.html'
})
export class DiagnosisFormComponent implements OnInit {
    public diagnosisData: string;
    public diseasesList: Array<Object>;
    public medicineList: Array<Object>;
    public medicineQuantity: Array<number>;

    ngOnInit () {
        this.diseasesList = [];
        this.medicineList = [];
        this.medicineQuantity = [];
    }
}