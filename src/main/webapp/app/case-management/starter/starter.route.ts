import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';
import { StartUpComponent } from './start-up/start-up.component';

export const startUpRoutes: Routes = [
    {
        path: 'startup',
        component: StartUpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Define artifact'
        },
        canActivate: [UserRouteAccessService]
    }
];
