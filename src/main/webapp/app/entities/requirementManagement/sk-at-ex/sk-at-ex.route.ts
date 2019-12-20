import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';
import { SkAtExComponent } from './sk-at-ex.component';
import { SkAtExDetailComponent } from './sk-at-ex-detail.component';
import { SkAtExUpdateComponent } from './sk-at-ex-update.component';
import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';

@Injectable({ providedIn: 'root' })
export class SkAtExResolve implements Resolve<ISkAtEx> {
  constructor(private service: SkAtExService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkAtEx> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((skAtEx: HttpResponse<SkAtEx>) => skAtEx.body));
    }
    return of(new SkAtEx());
  }
}

export const skAtExRoute: Routes = [
  {
    path: '',
    component: SkAtExComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SkAtExes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SkAtExDetailComponent,
    resolve: {
      skAtEx: SkAtExResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SkAtExes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SkAtExUpdateComponent,
    resolve: {
      skAtEx: SkAtExResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SkAtExes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SkAtExUpdateComponent,
    resolve: {
      skAtEx: SkAtExResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SkAtExes'
    },
    canActivate: [UserRouteAccessService]
  }
];
