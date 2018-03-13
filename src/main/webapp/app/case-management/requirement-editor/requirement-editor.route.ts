import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';
import { StartUpComponent } from './start-up/start-up.component';

export const startUpRoute: Routes = [
    {
        component: StartUpComponent,
        path: 'startup',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Define artifact'
        },
        canActivate: [UserRouteAccessService]
    }
];
