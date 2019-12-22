import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';
import { CMSharedModule } from '../common/shared-module.module';
import { EditorComponent, RequirementComponent, FilterComponent, editorRoutes, JhiArtifactDashboardComponent } from './';
import { CustomRequirementComponent } from './custom-requirement/custom-requirement.component';
import { RequirementEditorDataShareService } from './requirement-editor-data-share.service';
import { ClickChangerComponent } from './custom-requirement/click-changer/click-changer.component';

const EDITOR_STATES = [...editorRoutes];

@NgModule({
  imports: [RouterModule.forChild(EDITOR_STATES), GatewaySharedModule, CMSharedModule],
  exports: [],
  declarations: [
    EditorComponent,
    RequirementComponent,
    FilterComponent,
    JhiArtifactDashboardComponent,
    CustomRequirementComponent,
    ClickChangerComponent
  ],
  entryComponents: [EditorComponent],
  providers: [RequirementEditorDataShareService]
})
export class RequirementEditorModule {}
