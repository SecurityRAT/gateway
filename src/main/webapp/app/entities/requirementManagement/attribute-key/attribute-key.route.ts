import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';
import { AttributeKeyComponent } from './attribute-key.component';
import { AttributeKeyDetailComponent } from './attribute-key-detail.component';
import { AttributeKeyUpdateComponent } from './attribute-key-update.component';
import { AttributeKeyDeletePopupComponent } from './attribute-key-delete-dialog.component';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

@Injectable({ providedIn: 'root' })
export class AttributeKeyResolve implements Resolve<IAttributeKey> {
  constructor(private service: AttributeKeyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAttributeKey> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AttributeKey>) => response.ok),
        map((attributeKey: HttpResponse<AttributeKey>) => attributeKey.body)
      );
    }
    return of(new AttributeKey());
  }
}

export const attributeKeyRoute: Routes = [
  {
    path: '',
    component: AttributeKeyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttributeKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttributeKeyDetailComponent,
    resolve: {
      attributeKey: AttributeKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttributeKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttributeKeyUpdateComponent,
    resolve: {
      attributeKey: AttributeKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttributeKeys'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttributeKeyUpdateComponent,
    resolve: {
      attributeKey: AttributeKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttributeKeys'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const attributeKeyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AttributeKeyDeletePopupComponent,
    resolve: {
      attributeKey: AttributeKeyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AttributeKeys'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
