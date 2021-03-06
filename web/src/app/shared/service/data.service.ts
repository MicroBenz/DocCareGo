import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DataService {
    constructor(private http: AuthHttp) {}

    public getData(apiEndpoint: string) {
        return this.http.get(apiEndpoint)
            .map(this.handleResponse, this.handleError);
    }

    public getDataWithParams(apiEndpoint: string, params: Object) {
        let urlParams = new URLSearchParams();
        for (let item in params) {
            urlParams.set(item, params[item]);
        }
        return this.http.get(apiEndpoint, {
            search: urlParams
        })
        .map(this.handleResponse, this.handleError);
    }

    public searchData(apiEndpoint: string, query: string = '') {
        let params = new URLSearchParams();
        params.set('search', query);
        return this.http.get(apiEndpoint, {
            search: params
        })
        .map(this.handleResponse, this.handleError)
    }
    
    public saveData(apiEndpoint: string, body) {
        return this.http.post(apiEndpoint, body)
            .map(this.handleResponse, this.handleError);
    }

    public updateData(apiEndpoint: string, body) {
        return this.http.put(apiEndpoint, body)
            .map(this.handleResponse, this.handleError);
    }

    public deleteData(apiEndpoint: string) {
        return this.http.delete(apiEndpoint)
            .map(this.handleDeleteResponse, this.handleError);
    }
    
    private handleResponse = (res: Response) => {
        let result = res.json();
        if (result.success)
            return result.data;
        else
            throw new Error(result.clientMessage);
    }

    private handleDeleteResponse = (res: Response) => {
        let result = res.json();
        if (result.success)
            return result.message;
        else
            throw new Error(result.clientMessage);
    }

    private handleError = (error) => {
        console.error('DataService Error: ', error);        
    }
}