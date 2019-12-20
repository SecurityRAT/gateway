import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { RequirementSetComponent } from './requirement-set.component';
import { RequirementSetDetailComponent } from './requirement-set-detail.component';
import { RequirementSetUpdateComponent } from './requirement-set-update.component';
import { RequirementSetDeleteDialogComponent } from './requirement-set-delete-dialog.component';
import { requirementSetRoute } from './requirement-set.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(requirementSetRoute)],
  declarations: [
    RequirementSetComponent,
    RequirementSetDetailComponent,
    RequirementSetUpdateComponent,
    RequirementSetDeleteDialogComponent
  ],
  entryComponents: [RequirementSetDeleteDialogComponent]
})
export class RequirementManagementRequirementSetModule {}
