import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  SkAtExComponent,
  SkAtExDetailComponent,
  SkAtExUpdateComponent,
  SkAtExDeletePopupComponent,
  SkAtExDeleteDialogComponent,
  skAtExRoute,
  skAtExPopupRoute
} from './';

const ENTITY_STATES = [...skAtExRoute, ...skAtExPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SkAtExComponent, SkAtExDetailComponent, SkAtExUpdateComponent, SkAtExDeleteDialogComponent, SkAtExDeletePopupComponent],
  entryComponents: [SkAtExComponent, SkAtExUpdateComponent, SkAtExDeleteDialogComponent, SkAtExDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementSkAtExModule {}
