import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { startUpRoute, StartUpComponent } from './';
import { GatewaySharedModule } from '../../shared';

const EDITOR_STATES = [
    ...startUpRoute
];

@NgModule({
    imports: [
        RouterModule.forChild(EDITOR_STATES),
        GatewaySharedModule
    ],
    exports: [],
    declarations: [ StartUpComponent ],
    entryComponents: [StartUpComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementEditorModule { }
