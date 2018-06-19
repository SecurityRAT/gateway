import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRequirementComponent } from './custom-requirement.component';

describe('CustomRequirementComponent', () => {
  let component: CustomRequirementComponent;
  let fixture: ComponentFixture<CustomRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
