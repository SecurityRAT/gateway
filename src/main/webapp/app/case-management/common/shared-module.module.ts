import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttributeTagComponent, CaseManagementBackendService, CMUtilService } from './';
import { GatewaySharedModule } from '../../shared';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

@NgModule({
    imports: [GatewaySharedModule],
    exports: [AttributeTagComponent],
    declarations: [AttributeTagComponent],
    providers: [CaseManagementBackendService, CMUtilService, JhiFilterPipe, JhiOrderByPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CMSharedModule { }
