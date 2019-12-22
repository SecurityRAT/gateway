import { NgModule } from '@angular/core';
import { GatewaySharedLibsModule } from './shared-libs.module';
import { JhiAlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [GatewaySharedLibsModule],
  declarations: [JhiAlertComponent, AlertErrorComponent, HasAnyAuthorityDirective],
  exports: [GatewaySharedLibsModule, JhiAlertComponent, AlertErrorComponent, HasAnyAuthorityDirective]
})
export class GatewaySharedModule {}
