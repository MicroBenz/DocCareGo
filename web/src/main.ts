import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AuthService } from './app/shared/auth.service';
import { DataService } from './app/shared/data.service';
import { NavigationService } from './app/shared/navigation.service';

platformBrowserDynamic().bootstrapModule(AppModule, [
    AuthService,
    DataService,
    NavigationService
]);