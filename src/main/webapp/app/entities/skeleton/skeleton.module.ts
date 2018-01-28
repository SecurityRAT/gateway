import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SkeletonService,
    SkeletonPopupService,
    SkeletonComponent,
    SkeletonDetailComponent,
    SkeletonDialogComponent,
    SkeletonPopupComponent,
    SkeletonDeletePopupComponent,
    SkeletonDeleteDialogComponent,
    skeletonRoute,
    skeletonPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skeletonRoute,
    ...skeletonPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkeletonComponent,
        SkeletonDetailComponent,
        SkeletonDialogComponent,
        SkeletonDeleteDialogComponent,
        SkeletonPopupComponent,
        SkeletonDeletePopupComponent,
    ],
    entryComponents: [
        SkeletonComponent,
        SkeletonDialogComponent,
        SkeletonPopupComponent,
        SkeletonDeleteDialogComponent,
        SkeletonDeletePopupComponent,
    ],
    providers: [
        SkeletonService,
        SkeletonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySkeletonModule {}
