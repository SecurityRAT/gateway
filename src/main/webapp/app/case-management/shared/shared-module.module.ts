import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttributeTagComponent, CaseManagementBackendService, CMUtilService } from './';
import { GatewaySharedModule } from '../../shared';

@NgModule({
    imports: [GatewaySharedModule],
    exports: [AttributeTagComponent],
    declarations: [AttributeTagComponent],
    providers: [CaseManagementBackendService, CMUtilService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CMSharedModule { }
