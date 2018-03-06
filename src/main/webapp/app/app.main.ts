import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { GatewayAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(GatewayAppModule)
.then(() => console.log(`Application started`)) // Use the success parameter as the err parameter if necessary
.catch((err) => console.error(err));
