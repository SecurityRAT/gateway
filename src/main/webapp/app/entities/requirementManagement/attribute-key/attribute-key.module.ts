import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AttributeKeyComponent } from './attribute-key.component';
import { AttributeKeyDetailComponent } from './attribute-key-detail.component';
import { AttributeKeyUpdateComponent } from './attribute-key-update.component';
import { AttributeKeyDeleteDialogComponent } from './attribute-key-delete-dialog.component';
import { attributeKeyRoute } from './attribute-key.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(attributeKeyRoute)],
  declarations: [AttributeKeyComponent, AttributeKeyDetailComponent, AttributeKeyUpdateComponent, AttributeKeyDeleteDialogComponent],
  entryComponents: [AttributeKeyDeleteDialogComponent]
})
export class RequirementManagementAttributeKeyModule {}
