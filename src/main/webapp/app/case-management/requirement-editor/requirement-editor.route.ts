import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { EditorComponent } from './editor/editor.component';
import { CustomRequirementComponent } from './custom-requirement/custom-requirement.component';

export const editorRoutes: Routes = [
  {
    path: 'requirements',
    component: EditorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Requirement overview'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'custom-requirement',
    component: CustomRequirementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Custom-Requirement overview'
    },
    canActivate: [UserRouteAccessService]
  }
];
