import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMSharedModule } from '../common/shared-module.module';
import { RemoteComponent } from './remote/remote.component';

@NgModule({
  declarations: [RemoteComponent],
  imports: [CommonModule, CMSharedModule],
  entryComponents: [RemoteComponent]
  // exports: [RemoteComponent]
})
export class PersistenceModule {}
