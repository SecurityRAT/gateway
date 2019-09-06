import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CMSharedModule } from './common/shared-module.module';
import { StarterModule } from './starter/starter.module';
import { RequirementEditorModule } from './requirement-editor/requirement-editor.module';

@NgModule({
  imports: [CMSharedModule, StarterModule, RequirementEditorModule],
  declarations: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CaseManagementModule {}
