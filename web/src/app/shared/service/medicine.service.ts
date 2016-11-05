import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MEDICINE_ENDPOINT } from '../../config/api.config';

@Injectable()
export class MedicineService {
    constructor(private http: AuthHttp) {}

    public getMedicine () {
        return this.http.get(MEDICINE_ENDPOINT)
            .map(this.handleResponse, this.handleError);
    }

    public searchMedicine (query: string) {
        let params = new URLSearchParams();
        params.set('search', query);
        return this.http.get(MEDICINE_ENDPOINT, {
            search: params
        })
        .map(this.handleResponse, this.handleError)
    }

    private handleResponse = (res: Response) => {
        let result = res.json();
        if (result.success)
            return result.data;
        else
            throw new Error(result.clientMessage);
    }

    private handleError = (error) => {
        console.error('Medicine Service Error: ', error);        
    }
}