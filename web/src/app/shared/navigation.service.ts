import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

    constructor(private router: Router) { }

    private navigateToPath (path: string) {
        this.router.navigate([path]);
    }

    navigateToRegister () {
        this.navigateToPath('/register');
    }
}