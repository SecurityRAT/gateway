import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StartUpComponent, ChangeSelectionComponent, startUpRoutes, changeSelectionRoutes } from './';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { CMSharedModule } from '../common/shared-module.module';

const STARTER_STATES = [
    ...startUpRoutes,
    ...changeSelectionRoutes
];

@NgModule({
    imports: [
        GatewaySharedModule,
        CMSharedModule,
        RouterModule.forChild(STARTER_STATES)
    ],
    exports: [],
    declarations: [StartUpComponent, ChangeSelectionComponent],
    entryComponents: [StartUpComponent, ChangeSelectionComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StarterModule { }
