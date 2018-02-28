import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExtensionComponent } from './extension.component';
import { ExtensionDetailComponent } from './extension-detail.component';
import { ExtensionPopupComponent } from './extension-dialog.component';
import { ExtensionDeletePopupComponent } from './extension-delete-dialog.component';

export const extensionRoute: Routes = [
    {
        path: 'extension',
        component: ExtensionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Extensions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'extension/:id',
        component: ExtensionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Extensions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const extensionPopupRoute: Routes = [
    {
        path: 'extension-new',
        component: ExtensionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Extensions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extension/:id/edit',
        component: ExtensionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Extensions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extension/:id/delete',
        component: ExtensionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Extensions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
