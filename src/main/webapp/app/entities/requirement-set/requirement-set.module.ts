import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    RequirementSetService,
    RequirementSetPopupService,
    RequirementSetComponent,
    RequirementSetDetailComponent,
    RequirementSetDialogComponent,
    RequirementSetPopupComponent,
    RequirementSetDeletePopupComponent,
    RequirementSetDeleteDialogComponent,
    requirementSetRoute,
    requirementSetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...requirementSetRoute,
    ...requirementSetPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RequirementSetComponent,
        RequirementSetDetailComponent,
        RequirementSetDialogComponent,
        RequirementSetDeleteDialogComponent,
        RequirementSetPopupComponent,
        RequirementSetDeletePopupComponent,
    ],
    entryComponents: [
        RequirementSetComponent,
        RequirementSetDialogComponent,
        RequirementSetPopupComponent,
        RequirementSetDeleteDialogComponent,
        RequirementSetDeletePopupComponent,
    ],
    providers: [
        RequirementSetService,
        RequirementSetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRequirementSetModule {}
