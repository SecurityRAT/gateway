import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AttributeKeyService,
    AttributeKeyPopupService,
    AttributeKeyComponent,
    AttributeKeyDetailComponent,
    AttributeKeyDialogComponent,
    AttributeKeyPopupComponent,
    AttributeKeyDeletePopupComponent,
    AttributeKeyDeleteDialogComponent,
    attributeKeyRoute,
    attributeKeyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...attributeKeyRoute,
    ...attributeKeyPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AttributeKeyComponent,
        AttributeKeyDetailComponent,
        AttributeKeyDialogComponent,
        AttributeKeyDeleteDialogComponent,
        AttributeKeyPopupComponent,
        AttributeKeyDeletePopupComponent,
    ],
    entryComponents: [
        AttributeKeyComponent,
        AttributeKeyDialogComponent,
        AttributeKeyPopupComponent,
        AttributeKeyDeleteDialogComponent,
        AttributeKeyDeletePopupComponent,
    ],
    providers: [
        AttributeKeyService,
        AttributeKeyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAttributeKeyModule {}
