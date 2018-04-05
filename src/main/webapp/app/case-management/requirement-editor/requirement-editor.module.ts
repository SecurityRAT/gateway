import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { editorRoutes, EditorComponent } from './';
import { GatewaySharedModule } from '../../shared';
import { CMSharedModule } from '../common';

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
    declarations: [ EditorComponent ],
    entryComponents: [ EditorComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequirementEditorModule { }
