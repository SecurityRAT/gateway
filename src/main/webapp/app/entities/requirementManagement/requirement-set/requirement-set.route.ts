import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRequirementSet, RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from './requirement-set.service';
import { RequirementSetComponent } from './requirement-set.component';
import { RequirementSetDetailComponent } from './requirement-set-detail.component';
import { RequirementSetUpdateComponent } from './requirement-set-update.component';

@Injectable({ providedIn: 'root' })
export class RequirementSetResolve implements Resolve<IRequirementSet> {
  constructor(private service: RequirementSetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequirementSet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((requirementSet: HttpResponse<RequirementSet>) => {
          if (requirementSet.body) {
            return of(requirementSet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RequirementSet());
  }
}

export const requirementSetRoute: Routes = [
  {
    path: '',
    component: RequirementSetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RequirementSets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RequirementSetDetailComponent,
    resolve: {
      requirementSet: RequirementSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RequirementSets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RequirementSetUpdateComponent,
    resolve: {
      requirementSet: RequirementSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RequirementSets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RequirementSetUpdateComponent,
    resolve: {
      requirementSet: RequirementSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RequirementSets',
    },
    canActivate: [UserRouteAccessService],
  },
];
