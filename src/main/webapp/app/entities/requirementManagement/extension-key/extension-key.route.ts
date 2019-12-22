import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExtensionKey, ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';
import { ExtensionKeyComponent } from './extension-key.component';
import { ExtensionKeyDetailComponent } from './extension-key-detail.component';
import { ExtensionKeyUpdateComponent } from './extension-key-update.component';

@Injectable({ providedIn: 'root' })
export class ExtensionKeyResolve implements Resolve<IExtensionKey> {
  constructor(private service: ExtensionKeyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExtensionKey> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((extensionKey: HttpResponse<ExtensionKey>) => {
          if (extensionKey.body) {
            return of(extensionKey.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
