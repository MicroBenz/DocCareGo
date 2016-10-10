import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './auth/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register.component';
import { AppComponentWithNav } from './app.component.withnav';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: AppComponentWithNav,
        children: [
            {
                path: '',
                component: RegisterComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);