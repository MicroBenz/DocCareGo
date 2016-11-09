export class Workday {
    constructor(public id: number, 
                public doctor_id: number,
                public clinic_id: number,
                public date: string,
                public time: string) {
    }
}