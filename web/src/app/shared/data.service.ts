import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }from 'rxjs/Rx';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    public getDataObservable(url: string, method: string, payload: any): Observable<any> {
        let requestOptions = {
            method: method
        }

        if (method !== 'GET' && payload) {
            requestOptions['body'] = payload;
        }

        return this.http.request(url, requestOptions);
    }
}