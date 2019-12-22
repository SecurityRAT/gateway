import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISkeleton, Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonDetailComponent } from './skeleton-detail.component';
import { SkeletonUpdateComponent } from './skeleton-update.component';

@Injectable({ providedIn: 'root' })
export class SkeletonResolve implements Resolve<ISkeleton> {
  constructor(private service: SkeletonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISkeleton> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((skeleton: HttpResponse<Skeleton>) => {
          if (skeleton.body) {
            return of(skeleton.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
