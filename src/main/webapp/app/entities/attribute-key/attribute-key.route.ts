import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AttributeKeyComponent } from './attribute-key.component';
import { AttributeKeyDetailComponent } from './attribute-key-detail.component';
import { AttributeKeyPopupComponent } from './attribute-key-dialog.component';
import { AttributeKeyDeletePopupComponent } from './attribute-key-delete-dialog.component';

export const attributeKeyRoute: Routes = [
    {
        path: 'attribute-key',
        component: AttributeKeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeKeys'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'attribute-key/:id',
        component: AttributeKeyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeKeys'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attributeKeyPopupRoute: Routes = [
    {
        path: 'attribute-key-new',
        component: AttributeKeyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attribute-key/:id/edit',
        component: AttributeKeyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attribute-key/:id/delete',
        component: AttributeKeyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeKeys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
