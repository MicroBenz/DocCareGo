import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

enableProdMode()
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log('Bootstrap Completed'))
    .catch(err => console.error(err));