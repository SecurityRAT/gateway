import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AttributeComponent } from './attribute.component';
import { AttributeDetailComponent } from './attribute-detail.component';
import { AttributeUpdateComponent } from './attribute-update.component';
import { AttributeDeleteDialogComponent } from './attribute-delete-dialog.component';
import { attributeRoute } from './attribute.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(attributeRoute)],
  declarations: [AttributeComponent, AttributeDetailComponent, AttributeUpdateComponent, AttributeDeleteDialogComponent],
  entryComponents: [AttributeDeleteDialogComponent]
})
export class RequirementManagementAttributeModule {}
