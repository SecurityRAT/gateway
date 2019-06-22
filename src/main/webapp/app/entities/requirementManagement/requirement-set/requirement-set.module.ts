import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  RequirementSetComponent,
  RequirementSetDetailComponent,
  RequirementSetUpdateComponent,
  RequirementSetDeletePopupComponent,
  RequirementSetDeleteDialogComponent,
  requirementSetRoute,
  requirementSetPopupRoute
} from './';

const ENTITY_STATES = [...requirementSetRoute, ...requirementSetPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RequirementSetComponent,
    RequirementSetDetailComponent,
    RequirementSetUpdateComponent,
    RequirementSetDeleteDialogComponent,
    RequirementSetDeletePopupComponent
  ],
  entryComponents: [
    RequirementSetComponent,
    RequirementSetUpdateComponent,
    RequirementSetDeleteDialogComponent,
    RequirementSetDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementRequirementSetModule {}
