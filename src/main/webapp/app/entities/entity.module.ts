import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'requirement-set',
        loadChildren: './requirementManagement/requirement-set/requirement-set.module#RequirementManagementRequirementSetModule'
      },
      {
        path: 'skeleton',
        loadChildren: './requirementManagement/skeleton/skeleton.module#RequirementManagementSkeletonModule'
      },
      {
        path: 'attribute-key',
        loadChildren: './requirementManagement/attribute-key/attribute-key.module#RequirementManagementAttributeKeyModule'
      },
      {
        path: 'attribute',
        loadChildren: './requirementManagement/attribute/attribute.module#RequirementManagementAttributeModule'
      },
      {
        path: 'extension-key',
        loadChildren: './requirementManagement/extension-key/extension-key.module#RequirementManagementExtensionKeyModule'
      },
      {
        path: 'extension',
        loadChildren: './requirementManagement/extension/extension.module#RequirementManagementExtensionModule'
      },
      {
        path: 'sk-at-ex',
        loadChildren: './requirementManagement/sk-at-ex/sk-at-ex.module#RequirementManagementSkAtExModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
