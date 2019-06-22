import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';
import { ExtensionKeyComponent } from './extension-key.component';
import { ExtensionKeyDetailComponent } from './extension-key-detail.component';
import { ExtensionKeyUpdateComponent } from './extension-key-update.component';
import { ExtensionKeyDeletePopupComponent } from './extension-key-delete-dialog.component';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

@Injectable({ providedIn: 'root' })
export class ExtensionKeyResolve implements Resolve<IExtensionKey> {
  constructor(private service: ExtensionKeyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExtensionKey> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExtensionKey>) => response.ok),
        map((extensionKey: HttpResponse<ExtensionKey>) => extensionKey.body)
      );
    }
    return of(new ExtensionKey());
  }
}

export const extensionKeyRoute: Routes = [
  {
    path: '',
    component: ExtensionKeyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExtensionKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtensionKeyDetailComponent,
    resolve: {
      extensionKey: ExtensionKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExtensionKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtensionKeyUpdateComponent,
    resolve: {
      extensionKey: ExtensionKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExtensionKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtensionKeyUpdateComponent,
    resolve: {
      extensionKey: ExtensionKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExtensionKeys'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const extensionKeyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExtensionKeyDeletePopupComponent,
    resolve: {
      extensionKey: ExtensionKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExtensionKeys'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
