import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SkAtExComponent } from './sk-at-ex.component';
import { SkAtExDetailComponent } from './sk-at-ex-detail.component';
import { SkAtExUpdateComponent } from './sk-at-ex-update.component';
import { SkAtExDeleteDialogComponent } from './sk-at-ex-delete-dialog.component';
import { skAtExRoute } from './sk-at-ex.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(skAtExRoute)],
  declarations: [SkAtExComponent, SkAtExDetailComponent, SkAtExUpdateComponent, SkAtExDeleteDialogComponent],
  entryComponents: [SkAtExDeleteDialogComponent],
})
export class RequirementManagementSkAtExModule {}
