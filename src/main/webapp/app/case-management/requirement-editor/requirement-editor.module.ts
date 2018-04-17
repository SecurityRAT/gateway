import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { CMSharedModule } from '../common';
import { EditorComponent, RequirementComponent, editorRoutes } from './';

const EDITOR_STATES = [
    ...editorRoutes
];

@NgModule({
    imports: [
        RouterModule.forChild(EDITOR_STATES),
        GatewaySharedModule,
        CMSharedModule
    ],
    exports: [],
    declarations: [EditorComponent, RequirementComponent],
    entryComponents: [EditorComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementEditorModule { }
