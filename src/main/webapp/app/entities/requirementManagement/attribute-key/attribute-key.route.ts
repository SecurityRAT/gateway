import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAttributeKey, AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';
import { AttributeKeyComponent } from './attribute-key.component';
import { AttributeKeyDetailComponent } from './attribute-key-detail.component';
import { AttributeKeyUpdateComponent } from './attribute-key-update.component';

@Injectable({ providedIn: 'root' })
export class AttributeKeyResolve implements Resolve<IAttributeKey> {
  constructor(private service: AttributeKeyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttributeKey> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((attributeKey: HttpResponse<AttributeKey>) => {
          if (attributeKey.body) {
            return of(attributeKey.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
      authorities: [Authority.USER],
      pageTitle: 'AttributeKeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AttributeKeyDetailComponent,
    resolve: {
      attributeKey: AttributeKeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AttributeKeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AttributeKeyUpdateComponent,
    resolve: {
      attributeKey: AttributeKeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AttributeKeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AttributeKeyUpdateComponent,
    resolve: {
      attributeKey: AttributeKeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AttributeKeys',
    },
    canActivate: [UserRouteAccessService],
  },
];
