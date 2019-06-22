import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRequirementComponent } from './../../../../../../../main/webapp/app/case-management/requirement-editor/custom-requirement/custom-requirement.component';

import { GatewayTestModule } from '../../../../test.module';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { RequirementEditorDataShareService } from './../../../../../../../main/webapp/app/case-management/requirement-editor/requirement-editor-data-share.service';
import {
  // CMEnhancementSubType,
  CMRequirement,
  // CMExtensionKey,
  //  CMAttribute,
  //  CMExtensionType,
  //  CMExtension,
  //  CMStatusSubType
} from '../../../../../../../main/webapp/app/case-management/common';

describe('CustomRequirementComponent', () => {
  let component: CustomRequirementComponent;
  let fixture: ComponentFixture<CustomRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRequirementComponent],
      imports: [GatewayTestModule],
      providers: [CMUtilService, RequirementEditorDataShareService]
    })
      .overrideTemplate(CustomRequirementComponent, '')
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

  it('should create Empty CustomRequirement', () => {
    component.createEmptyCustomRequirementObject();
    expect(component.customRequirementObj).not.toBeNull();
  });

  it('create custom Copy and sets EditMode', () => {
    const tempCustReq = new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null);
    component.updateCustomRequirement();
    expect(component.editMode).toBe(true);
    expect(component.customRequirementObj.name).toEqual(tempCustReq.name);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ends edit Mode and adds edited CmReq to customRequirementList', () => {
    component.customRequirementList = [
      new CMRequirement(null, 'CUS-01', 1, null, [], [], [], [], null, null, null, null),
      new CMRequirement(null, 'CUS-02', 1, null, [], [], [], [], null, null, null, null)];

    component.customRequirementObj = new CMRequirement(null, 'CUS-01', 999, null, [], [], [], [], null, null, null, null);

    component.updateCustomRequirement();
    expect(component.customRequirementList[0].categoryId).toBe(999);
    expect(component.editMode).toBe(false);
  });

  it('should add the new CusReq to the customRequirementList', () => {
    component.customRequirementList = [];
    component.customRequirementObj = new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null);
    component.addCustomRequirement();
    expect(component.customRequirementList.length).toBe(1);
  });

  it('should remove customrequirement', () => {
    const tempCustReq = new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null);
    component.customRequirementList.push(tempCustReq);
    component.removeCustomRequirement(tempCustReq);
    expect(component.customRequirementList.length).toBe(0);
  });

  it(' should remove empty categories', () => {
    component.categoriesInList = [1, 2, 3];
    component.customRequirementList.push(new CMRequirement(null, 'CUS-01', 1, null, [], [], [], [], null, null, null, null));
    component.customRequirementList.push(new CMRequirement(null, 'CUS-02', 2, null, [], [], [], [], null, null, null, null));
    component.searchAndRemoveEmptyCategories();
    expect(component.categoriesInList.length).toBe(2);
    expect(component.categoriesInList[0]).toBe(1);
    expect(component.categoriesInList[1]).toBe(2);
  });

  describe('should generate names correctly', () => {
    it('-> name-number < 9', () => {
      component.customRequirementList.push(new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null));
      component.customRequirementList.push(new CMRequirement(null, 'CUS-02', null, null, [], [], [], [], null, null, null, null));

      expect(component.setUpCustomRequirementName()).toEqual('CUS-03');
    });

    it('-> with empty customRequirementList', () => {
      component.customRequirementList = [];
      expect(component.setUpCustomRequirementName()).toEqual('CUS-01');
    });

    it('-> number greater >= 9  ', () => {
      component.customRequirementList = [
        new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null),
        new CMRequirement(null, 'CUS-9', null, null, [], [], [], [], null, null, null, null)];
      expect(component.setUpCustomRequirementName()).toEqual('CUS-10');
    });

  });
});
