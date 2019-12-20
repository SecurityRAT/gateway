import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Extension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';
import { ExtensionComponent } from './extension.component';
import { ExtensionDetailComponent } from './extension-detail.component';
import { ExtensionUpdateComponent } from './extension-update.component';
import { IExtension } from 'app/shared/model/requirementManagement/extension.model';

@Injectable({ providedIn: 'root' })
export class ExtensionResolve implements Resolve<IExtension> {
  constructor(private service: ExtensionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExtension> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((extension: HttpResponse<Extension>) => extension.body));
    }
    return of(new Extension());
  }
}

export const extensionRoute: Routes = [
  {
    path: '',
    component: ExtensionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtensionDetailComponent,
    resolve: {
      extension: ExtensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtensionUpdateComponent,
    resolve: {
      extension: ExtensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtensionUpdateComponent,
    resolve: {
      extension: ExtensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extensions'
    },
    canActivate: [UserRouteAccessService]
  }
];
