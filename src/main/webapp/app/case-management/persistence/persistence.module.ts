import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteComponent } from './remote/remote.component';

import { persistenceRoutes } from './persistence.route';

@NgModule({
  declarations: [RemoteComponent],
  imports: [CommonModule, RouterModule.forChild(persistenceRoutes)],
  entryComponents: [RemoteComponent]
})
export class PersistenceModule {}
