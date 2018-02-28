import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SkAtExComponent } from './sk-at-ex.component';
import { SkAtExDetailComponent } from './sk-at-ex-detail.component';
import { SkAtExPopupComponent } from './sk-at-ex-dialog.component';
import { SkAtExDeletePopupComponent } from './sk-at-ex-delete-dialog.component';

export const skAtExRoute: Routes = [
    {
        path: 'sk-at-ex',
        component: SkAtExComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SkAtExes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sk-at-ex/:id',
        component: SkAtExDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SkAtExes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skAtExPopupRoute: Routes = [
    {
        path: 'sk-at-ex-new',
        component: SkAtExPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SkAtExes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sk-at-ex/:id/edit',
        component: SkAtExPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SkAtExes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sk-at-ex/:id/delete',
        component: SkAtExDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SkAtExes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
