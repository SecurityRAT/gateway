import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequirementEditorModule } from './requirement-editor/requirement-editor.module';
import { StarterModule } from './starter/starter.module';
import { CMSharedModule } from './common/shared-module.module';

@NgModule({
  imports: [
    CMSharedModule,
    RequirementEditorModule,
    StarterModule
  ],
  declarations: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CaseManagementModule { }
