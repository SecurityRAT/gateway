import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExtensionKeyComponent } from './extension-key.component';
import { ExtensionKeyDetailComponent } from './extension-key-detail.component';
import { ExtensionKeyPopupComponent } from './extension-key-dialog.component';
import { ExtensionKeyDeletePopupComponent } from './extension-key-delete-dialog.component';

export const extensionKeyRoute: Routes = [
    {
        path: 'extension-key',
        component: ExtensionKeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExtensionKeys'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'extension-key/:id',
        component: ExtensionKeyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExtensionKeys'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const extensionKeyPopupRoute: Routes = [
    {
        path: 'extension-key-new',
        component: ExtensionKeyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExtensionKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extension-key/:id/edit',
        component: ExtensionKeyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExtensionKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extension-key/:id/delete',
        component: ExtensionKeyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExtensionKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
