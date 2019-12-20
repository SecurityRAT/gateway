import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';
import { AttributeKeyComponent } from './attribute-key.component';
import { AttributeKeyDetailComponent } from './attribute-key-detail.component';
import { AttributeKeyUpdateComponent } from './attribute-key-update.component';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

@Injectable({ providedIn: 'root' })
export class AttributeKeyResolve implements Resolve<IAttributeKey> {
  constructor(private service: AttributeKeyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttributeKey> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((attributeKey: HttpResponse<AttributeKey>) => attributeKey.body));
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
