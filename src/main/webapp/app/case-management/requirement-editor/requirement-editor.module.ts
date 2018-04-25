import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { CMSharedModule } from '../common/shared-module.module';
import { EditorComponent, RequirementComponent, FilterComponent, editorRoutes } from './';

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
    declarations: [EditorComponent, RequirementComponent, FilterComponent],
    entryComponents: [EditorComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementEditorModule { }
