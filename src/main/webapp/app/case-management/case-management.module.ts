import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CMSharedModule } from './common/shared-module.module';

@NgModule({
  imports: [
    CMSharedModule,
    RouterModule.forChild([
      {
        path: 'persistence',
        loadChildren: () => import('./persistence/persistence.module').then(m => m.PersistenceModule)
      },
      {
        path: '',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: '',
        loadChildren: () => import('./requirement-editor/requirement-editor.module').then(m => m.RequirementEditorModule)
      }
    ])
  ],
  declarations: [],
  providers: []
})
export class CaseManagementModule {}
