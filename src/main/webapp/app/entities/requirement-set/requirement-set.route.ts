import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RequirementSetComponent } from './requirement-set.component';
import { RequirementSetDetailComponent } from './requirement-set-detail.component';
import { RequirementSetPopupComponent } from './requirement-set-dialog.component';
import { RequirementSetDeletePopupComponent } from './requirement-set-delete-dialog.component';

export const requirementSetRoute: Routes = [
    {
        path: 'requirement-set',
        component: RequirementSetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequirementSets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'requirement-set/:id',
        component: RequirementSetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequirementSets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requirementSetPopupRoute: Routes = [
    {
        path: 'requirement-set-new',
        component: RequirementSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequirementSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'requirement-set/:id/edit',
        component: RequirementSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequirementSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'requirement-set/:id/delete',
        component: RequirementSetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequirementSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
