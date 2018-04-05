import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequirementEditorModule } from './requirement-editor/requirement-editor.module';
import { StarterModule } from './starter/starter.module';
import { CMSharedModule } from './common';

@NgModule({
  imports: [
    RequirementEditorModule,
    StarterModule,
    CMSharedModule
  ],
  declarations: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CaseManagementModule { }
