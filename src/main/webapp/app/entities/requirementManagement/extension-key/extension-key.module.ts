import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ExtensionKeyComponent } from './extension-key.component';
import { ExtensionKeyDetailComponent } from './extension-key-detail.component';
import { ExtensionKeyUpdateComponent } from './extension-key-update.component';
import { ExtensionKeyDeleteDialogComponent } from './extension-key-delete-dialog.component';
import { extensionKeyRoute } from './extension-key.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(extensionKeyRoute)],
  declarations: [ExtensionKeyComponent, ExtensionKeyDetailComponent, ExtensionKeyUpdateComponent, ExtensionKeyDeleteDialogComponent],
  entryComponents: [ExtensionKeyDeleteDialogComponent]
})
export class RequirementManagementExtensionKeyModule {}
