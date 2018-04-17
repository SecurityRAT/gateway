import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementComponent } from '../../../../../../../main/webapp/app/case-management/requirement-editor/requirement/requirement.component';
import { JhiEventManager } from 'ng-jhipster';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { GatewayTestModule } from '../../../../test.module';

describe('RequirementComponent', () => {
  let component: RequirementComponent;
  let fixture: ComponentFixture<RequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GatewayTestModule],
      providers: [CMUtilService],
      declarations: [ RequirementComponent ]
    })
    .overrideTemplate(RequirementComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
