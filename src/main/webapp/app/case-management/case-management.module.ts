import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
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
