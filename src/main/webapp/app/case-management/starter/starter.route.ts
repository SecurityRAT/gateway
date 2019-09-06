import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { StartUpComponent, ChangeSelectionComponent } from './start-up/start-up.component';

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

export const changeSelectionRoutes: Routes = [
  {
    path: 'change-selection',
    component: ChangeSelectionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Change selection'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
