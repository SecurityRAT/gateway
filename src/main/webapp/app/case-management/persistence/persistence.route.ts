import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { RemoteComponent } from './remote/remote.component';

export const persistenceRoutes: Routes = [
  {
    path: 'remote',
    component: RemoteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Persist requirements'
    },
    canActivate: [UserRouteAccessService]
  }
];
