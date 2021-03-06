import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRequirementComponent } from 'app/case-management/requirement-editor/custom-requirement/custom-requirement.component';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementEditorDataShareService } from 'app/case-management/requirement-editor/requirement-editor-data-share.service';
import { CMRequirement, CMAttribute, CMExtensionKey, CMExtensionType, CMExtension } from 'app/case-management/common';
describe('Component Tests', () => {
  describe('CustomRequirementComponent', () => {
    let component: CustomRequirementComponent;
    let fixture: ComponentFixture<CustomRequirementComponent>;
    let reqEditorDataShareService: RequirementEditorDataShareService;
    beforeEach(async(() => {
      reqEditorDataShareService = new RequirementEditorDataShareService();
      const attributes = [
        new CMAttribute(1, 'Medium', 10, 1, 'Medium criticality', []),
        new CMAttribute(1, 'Low', 20, 1, 'Low criticality', [])
      ];
      const categories = [new CMAttribute(1, 'Authentication', 30, 0, 'Authentication description', [])];
      const statusValues = [new CMExtension(1, 'task', 10, 'task desc'), new CMExtension(2, 'implicit', 20, 'implicit')];
      const status = [new CMExtensionKey(1, 'Strategy', 'some desc', 10, CMExtensionType.ENUM, statusValues)];
      const enhancements = [
        new CMExtensionKey(1, 'More Information', 'some description', 20),
        new CMExtensionKey(2, 'Motivation', 'some description', 20)
      ];
      reqEditorDataShareService.setAttributes(attributes);
      reqEditorDataShareService.setCategories(categories);
      reqEditorDataShareService.setEnhancements(enhancements);
      reqEditorDataShareService.setStatus(status);
      TestBed.configureTestingModule({
        declarations: [CustomRequirementComponent],
        imports: [GatewayTestModule],
        providers: [{ provide: RequirementEditorDataShareService, useValue: reqEditorDataShareService }]
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
      const category = new CMAttribute(1, 'Authentication', 30, 0, 'Authentication description', []);
      reqEditorDataShareService.setCategories([category]);
      component.createEmptyCustomRequirementObject();
      expect(component.customRequirementObj).not.toBeNull();
    });

    it('create custom Copy and sets EditMode', () => {
      const tempCustReq = new CMRequirement(null, 'CUS-01', null, null, [], [], [], [], null, null, null, null);
      component.editCustomRequirement(tempCustReq);
      expect(component.editMode).toBe(true);
      expect(component.customRequirementObj.name).toEqual(tempCustReq.name);
    });

    it('ends edit Mode and adds edited CmReq to customRequirementList', () => {
      component.customRequirementList = [
        new CMRequirement(null, 'CUS-01', 1, null, [], [], [], [], null, null, null, null),
        new CMRequirement(null, 'CUS-02', 1, null, [], [], [], [], null, null, null, null)
      ];

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
          new CMRequirement(null, 'CUS-9', null, null, [], [], [], [], null, null, null, null)
        ];
        expect(component.setUpCustomRequirementName()).toEqual('CUS-10');
      });
    });
  });
});
