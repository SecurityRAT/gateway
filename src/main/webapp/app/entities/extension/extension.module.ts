import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ExtensionService,
    ExtensionPopupService,
    ExtensionComponent,
    ExtensionDetailComponent,
    ExtensionDialogComponent,
    ExtensionPopupComponent,
    ExtensionDeletePopupComponent,
    ExtensionDeleteDialogComponent,
    extensionRoute,
    extensionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...extensionRoute,
    ...extensionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExtensionComponent,
        ExtensionDetailComponent,
        ExtensionDialogComponent,
        ExtensionDeleteDialogComponent,
        ExtensionPopupComponent,
        ExtensionDeletePopupComponent,
    ],
    entryComponents: [
        ExtensionComponent,
        ExtensionDialogComponent,
        ExtensionPopupComponent,
        ExtensionDeleteDialogComponent,
        ExtensionDeletePopupComponent,
    ],
    providers: [
        ExtensionService,
        ExtensionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayExtensionModule {}
