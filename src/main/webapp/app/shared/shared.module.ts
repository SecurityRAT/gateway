import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GatewaySharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [GatewaySharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {
  static forRoot() {
    return {
      ngModule: GatewaySharedModule
    };
  }
}
