import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class AuthService {

    constructor(private dataService: DataService) { }

    public makeLogin () {
        // this.dataService.getDataObservable('/api/v1/test', 'GET', null);
        console.log('YES');
    }
}