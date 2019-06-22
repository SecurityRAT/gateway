import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  SkeletonComponent,
  SkeletonDetailComponent,
  SkeletonUpdateComponent,
  SkeletonDeletePopupComponent,
  SkeletonDeleteDialogComponent,
  skeletonRoute,
  skeletonPopupRoute
} from './';

const ENTITY_STATES = [...skeletonRoute, ...skeletonPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SkeletonComponent,
    SkeletonDetailComponent,
    SkeletonUpdateComponent,
    SkeletonDeleteDialogComponent,
    SkeletonDeletePopupComponent
  ],
  entryComponents: [SkeletonComponent, SkeletonUpdateComponent, SkeletonDeleteDialogComponent, SkeletonDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementSkeletonModule {}
