import { NgModule } from '@angular/core';
import { AttributeTagComponent, CaseManagementBackendService, CMUtilService, JiraService } from './';
import { GatewaySharedModule } from '../../shared';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

@NgModule({
  imports: [GatewaySharedModule],
  exports: [AttributeTagComponent, GatewaySharedModule],
  declarations: [AttributeTagComponent],
  providers: [CaseManagementBackendService, CMUtilService, JiraService, JhiFilterPipe, JhiOrderByPipe]
})
export class CMSharedModule {}
