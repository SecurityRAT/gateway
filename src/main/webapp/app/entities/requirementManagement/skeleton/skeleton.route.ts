import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonDetailComponent } from './skeleton-detail.component';
import { SkeletonUpdateComponent } from './skeleton-update.component';
import { SkeletonDeletePopupComponent } from './skeleton-delete-dialog.component';
import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';

@Injectable({ providedIn: 'root' })
export class SkeletonResolve implements Resolve<ISkeleton> {
  constructor(private service: SkeletonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISkeleton> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Skeleton>) => response.ok),
        map((skeleton: HttpResponse<Skeleton>) => skeleton.body)
      );
    }
    return of(new Skeleton());
  }
}

export const skeletonRoute: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Skeletons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SkeletonDetailComponent,
    resolve: {
      skeleton: SkeletonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Skeletons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SkeletonUpdateComponent,
    resolve: {
      skeleton: SkeletonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Skeletons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SkeletonUpdateComponent,
    resolve: {
      skeleton: SkeletonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Skeletons'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const skeletonPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SkeletonDeletePopupComponent,
    resolve: {
      skeleton: SkeletonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Skeletons'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
