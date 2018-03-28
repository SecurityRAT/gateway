import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttributeTagComponent, CaseManagementBackendService, CMDataSharingService } from './';
import { GatewaySharedModule } from '../../shared';

@NgModule({
    imports: [GatewaySharedModule],
    exports: [AttributeTagComponent],
    declarations: [AttributeTagComponent],
    providers: [ CaseManagementBackendService, CMDataSharingService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CMSharedModule { }
