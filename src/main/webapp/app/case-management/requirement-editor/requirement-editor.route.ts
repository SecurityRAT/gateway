import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access-service';
import { EditorComponent } from './editor/editor.component';

export const editorRoutes: Routes = [
    {
        path: 'requirements',
        component: EditorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Requirement overview'
        },
        canActivate: [UserRouteAccessService]
    }
];
