import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ExtensionKeyService,
    ExtensionKeyPopupService,
    ExtensionKeyComponent,
    ExtensionKeyDetailComponent,
    ExtensionKeyDialogComponent,
    ExtensionKeyPopupComponent,
    ExtensionKeyDeletePopupComponent,
    ExtensionKeyDeleteDialogComponent,
    extensionKeyRoute,
    extensionKeyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...extensionKeyRoute,
    ...extensionKeyPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExtensionKeyComponent,
        ExtensionKeyDetailComponent,
        ExtensionKeyDialogComponent,
        ExtensionKeyDeleteDialogComponent,
        ExtensionKeyPopupComponent,
        ExtensionKeyDeletePopupComponent,
    ],
    entryComponents: [
        ExtensionKeyComponent,
        ExtensionKeyDialogComponent,
        ExtensionKeyPopupComponent,
        ExtensionKeyDeleteDialogComponent,
        ExtensionKeyDeletePopupComponent,
    ],
    providers: [
        ExtensionKeyService,
        ExtensionKeyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayExtensionKeyModule {}
