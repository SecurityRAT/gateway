import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequirementEditorModule } from './requirement-editor/requirement-editor.module';
import { CaseManagementBackendService } from './shared';

@NgModule({
  imports: [
    RequirementEditorModule
  ],
  declarations: [],
  providers: [CaseManagementBackendService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CaseManagementModule { }
