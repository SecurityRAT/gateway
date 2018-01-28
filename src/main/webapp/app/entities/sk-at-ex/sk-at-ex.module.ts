import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SkAtExService,
    SkAtExPopupService,
    SkAtExComponent,
    SkAtExDetailComponent,
    SkAtExDialogComponent,
    SkAtExPopupComponent,
    SkAtExDeletePopupComponent,
    SkAtExDeleteDialogComponent,
    skAtExRoute,
    skAtExPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skAtExRoute,
    ...skAtExPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkAtExComponent,
        SkAtExDetailComponent,
        SkAtExDialogComponent,
        SkAtExDeleteDialogComponent,
        SkAtExPopupComponent,
        SkAtExDeletePopupComponent,
    ],
    entryComponents: [
        SkAtExComponent,
        SkAtExDialogComponent,
        SkAtExPopupComponent,
        SkAtExDeleteDialogComponent,
        SkAtExDeletePopupComponent,
    ],
    providers: [
        SkAtExService,
        SkAtExPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySkAtExModule {}
