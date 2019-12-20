import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonDetailComponent } from './skeleton-detail.component';
import { SkeletonUpdateComponent } from './skeleton-update.component';
import { SkeletonDeleteDialogComponent } from './skeleton-delete-dialog.component';
import { skeletonRoute } from './skeleton.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(skeletonRoute)],
  declarations: [SkeletonComponent, SkeletonDetailComponent, SkeletonUpdateComponent, SkeletonDeleteDialogComponent],
  entryComponents: [SkeletonDeleteDialogComponent]
})
export class RequirementManagementSkeletonModule {}
