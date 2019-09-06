import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayTestModule } from '../../../../test.module';
import { FilterComponent } from 'app/case-management/requirement-editor/filter/filter.component';
import { CMUtilService } from 'app/case-management/common/services/util.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GatewayTestModule],
      declarations: [FilterComponent],
      providers: [CMUtilService]
    })
      .overrideTemplate(FilterComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
