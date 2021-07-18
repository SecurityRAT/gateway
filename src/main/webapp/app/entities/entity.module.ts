import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'requirement-set',
        loadChildren: () =>
          import('./requirementManagement/requirement-set/requirement-set.module').then(m => m.RequirementManagementRequirementSetModule),
      },
      {
        path: 'skeleton',
        loadChildren: () => import('./requirementManagement/skeleton/skeleton.module').then(m => m.RequirementManagementSkeletonModule),
      },
      {
        path: 'attribute-key',
        loadChildren: () =>
          import('./requirementManagement/attribute-key/attribute-key.module').then(m => m.RequirementManagementAttributeKeyModule),
      },
      {
        path: 'attribute',
        loadChildren: () => import('./requirementManagement/attribute/attribute.module').then(m => m.RequirementManagementAttributeModule),
      },
      {
        path: 'extension-key',
        loadChildren: () =>
          import('./requirementManagement/extension-key/extension-key.module').then(m => m.RequirementManagementExtensionKeyModule),
      },
      {
        path: 'extension',
        loadChildren: () => import('./requirementManagement/extension/extension.module').then(m => m.RequirementManagementExtensionModule),
      },
      {
        path: 'sk-at-ex',
        loadChildren: () => import('./requirementManagement/sk-at-ex/sk-at-ex.module').then(m => m.RequirementManagementSkAtExModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
