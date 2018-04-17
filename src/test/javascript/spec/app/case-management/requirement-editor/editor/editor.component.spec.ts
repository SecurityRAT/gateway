import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from '../../../../../../../main/webapp/app/case-management/requirement-editor/editor/editor.component';
import { GatewayTestModule } from '../../../../test.module';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { CaseManagementBackendService } from '../../../../../../../main/webapp/app/case-management/common/services/case-management-backend.service';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GatewayTestModule],
      providers: [CMUtilService, CaseManagementBackendService, JhiFilterPipe, JhiOrderByPipe],
      declarations: [ EditorComponent ]
    })
    .overrideTemplate(EditorComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
