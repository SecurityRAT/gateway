import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  ExtensionKeyComponent,
  ExtensionKeyDetailComponent,
  ExtensionKeyUpdateComponent,
  ExtensionKeyDeletePopupComponent,
  ExtensionKeyDeleteDialogComponent,
  extensionKeyRoute,
  extensionKeyPopupRoute
} from './';

const ENTITY_STATES = [...extensionKeyRoute, ...extensionKeyPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExtensionKeyComponent,
    ExtensionKeyDetailComponent,
    ExtensionKeyUpdateComponent,
    ExtensionKeyDeleteDialogComponent,
    ExtensionKeyDeletePopupComponent
  ],
  entryComponents: [
    ExtensionKeyComponent,
    ExtensionKeyUpdateComponent,
    ExtensionKeyDeleteDialogComponent,
    ExtensionKeyDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementManagementExtensionKeyModule {}
