import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonDetailComponent } from './skeleton-detail.component';
import { SkeletonPopupComponent } from './skeleton-dialog.component';
import { SkeletonDeletePopupComponent } from './skeleton-delete-dialog.component';

export const skeletonRoute: Routes = [
    {
        path: 'skeleton',
        component: SkeletonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Skeletons'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'skeleton/:id',
        component: SkeletonDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Skeletons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skeletonPopupRoute: Routes = [
    {
        path: 'skeleton-new',
        component: SkeletonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Skeletons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skeleton/:id/edit',
        component: SkeletonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Skeletons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skeleton/:id/delete',
        component: SkeletonDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Skeletons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
