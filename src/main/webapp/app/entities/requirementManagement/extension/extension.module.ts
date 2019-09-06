import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  ExtensionComponent,
  ExtensionDetailComponent,
  ExtensionUpdateComponent,
  ExtensionDeletePopupComponent,
  ExtensionDeleteDialogComponent,
  extensionRoute,
  extensionPopupRoute
} from './';

const ENTITY_STATES = [...extensionRoute, ...extensionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExtensionComponent,
    ExtensionDetailComponent,
    ExtensionUpdateComponent,
    ExtensionDeleteDialogComponent,
    ExtensionDeletePopupComponent
  ],
  entryComponents: [ExtensionComponent, ExtensionUpdateComponent, ExtensionDeleteDialogComponent, ExtensionDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementExtensionModule {}
