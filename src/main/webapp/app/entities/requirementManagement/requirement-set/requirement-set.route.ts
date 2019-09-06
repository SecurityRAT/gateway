import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from './requirement-set.service';
import { RequirementSetComponent } from './requirement-set.component';
import { RequirementSetDetailComponent } from './requirement-set-detail.component';
import { RequirementSetUpdateComponent } from './requirement-set-update.component';
import { RequirementSetDeletePopupComponent } from './requirement-set-delete-dialog.component';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

@Injectable({ providedIn: 'root' })
export class RequirementSetResolve implements Resolve<IRequirementSet> {
  constructor(private service: RequirementSetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequirementSet> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RequirementSet>) => response.ok),
        map((requirementSet: HttpResponse<RequirementSet>) => requirementSet.body)
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
      authorities: ['ROLE_USER'],
      pageTitle: 'RequirementSets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequirementSetDetailComponent,
    resolve: {
      requirementSet: RequirementSetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RequirementSets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequirementSetUpdateComponent,
    resolve: {
      requirementSet: RequirementSetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RequirementSets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RequirementSetUpdateComponent,
    resolve: {
      requirementSet: RequirementSetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RequirementSets'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const requirementSetPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RequirementSetDeletePopupComponent,
    resolve: {
      requirementSet: RequirementSetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RequirementSets'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
