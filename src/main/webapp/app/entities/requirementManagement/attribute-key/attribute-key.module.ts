import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  AttributeKeyComponent,
  AttributeKeyDetailComponent,
  AttributeKeyUpdateComponent,
  AttributeKeyDeletePopupComponent,
  AttributeKeyDeleteDialogComponent,
  attributeKeyRoute,
  attributeKeyPopupRoute
} from './';

const ENTITY_STATES = [...attributeKeyRoute, ...attributeKeyPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AttributeKeyComponent,
    AttributeKeyDetailComponent,
    AttributeKeyUpdateComponent,
    AttributeKeyDeleteDialogComponent,
    AttributeKeyDeletePopupComponent
  ],
  entryComponents: [
    AttributeKeyComponent,
    AttributeKeyUpdateComponent,
    AttributeKeyDeleteDialogComponent,
    AttributeKeyDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementAttributeKeyModule {}
