import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class TestService {
    constructor(private http: Http) {}

    public getSearchByKey (key: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('search', key);
        return this.http.get('/api/v1/test/searchPersonnel', {
            search: params
        })
        .map((res: Response) => {
            return res.json();
        });
    }
}