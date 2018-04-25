import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementComponent } from '../../../../../../../main/webapp/app/case-management/requirement-editor/requirement/requirement.component';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { CMStatusSubType, CMExtension, CMRequirement, CMEnhancementSubType, CMExtensionKey } from '../../../../../../../main/webapp/app/case-management/common';

describe('Component Tests', () => {
  describe('RequirementComponent', () => {
    let component: RequirementComponent;
    let fixture: ComponentFixture<RequirementComponent>;
    let cmService: CMUtilService;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        providers: [CMUtilService],
        declarations: [RequirementComponent]
      })
        .overrideTemplate(RequirementComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RequirementComponent);
      component = fixture.componentInstance;
      cmService = fixture.debugElement.injector.get(CMUtilService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Test methods', () => {

      it('should select all requirement', () => {
        component.requirements = [
          new CMRequirement(1, 'test1', 1, 1, [], [], [], [], '', false),
          new CMRequirement(2, 'test2', 1, 1, [], [], [], [], '', false),
          new CMRequirement(3, 'test1', 1, 1, [], [], [], [], '', true)];
        const selectedReqs = component.getSelectedRequirements();
        expect(selectedReqs.length).toBe(1);
        expect(selectedReqs[0].id).toBe(3);

        component.viewProperties.selectAllState = true;
        component.selectAllReqs();
        expect(component.requirements[0].selected).toBeTruthy();
        expect(component.requirements[1].selected).toBeTruthy();
        expect(component.requirements[2].selected).toBeTruthy();
      });

      it('should return an array of selected parameters', () => {
        component.parameters = [
          {
            id: 1,
            name: 'High',
            showOrder: 10,
            children: [
              {
                id: 3,
                name: 'Low',
                showOrder: 10
              }
            ]
          },
          {
            id: 2,
            name: 'Medium',
            showOrder: 20
          }
        ];
        spyOn(cmService, 'filterByObj').and.callThrough();

        const values = component.getParameters([3]);

        expect(values.length).toBe(1);
        expect(values[0]).toEqual('Low');
        expect(cmService.filterByObj).toHaveBeenCalledTimes(2);
      });

      describe('Test #selectedStatus with single select', () => {
        it('Should change selected status value to new one', () => {

          const preSelectedStatus: CMStatusSubType = {
            keyId: 1,
            content: 'Task',
            values: [1]
          };
          const newValue: CMExtension = {
            id: 2,
            content: 'Refused'
          };
          /*  */
          component.selectStatus(preSelectedStatus, newValue);
          expect(preSelectedStatus.values.length).toBe(1);
          expect(preSelectedStatus.values[0]).toBe(2);
          expect(preSelectedStatus.content).toBe('Refused');
        });
      });

      describe('Test #getEnhancement', () => {
        it('should return the only available enhancement', () => {

          const req = new CMRequirement(1, 'testreq', 1, 1, [], [], [new CMEnhancementSubType(1, [])], []);

          const returnValue = component.getActiveEnhancement([], req);
          expect(returnValue).toEqual(`${req.enhancements[0].keyId}${req.id}`);
        });
        it('should return an empty string', () => {

          const req = new CMRequirement(1, 'testreq', 1, 1, [], [], [], []);

          const returnValue = component.getActiveEnhancement([], req);
          expect(returnValue).toEqual('');
        });

        it('should return the default value', () => {

          const req = new CMRequirement(1, 'testreq', 1, 1, [], [], [new CMEnhancementSubType(1, []), new CMEnhancementSubType(2, [])], []);

          const enhancement = [ new CMExtensionKey(1, 'More info', '', 1), new CMExtensionKey(1, 'motiv', '', 2)];
          const returnValue = component.getActiveEnhancement(enhancement, req);
          expect(returnValue).toEqual('11');
        });
      });

      describe('Test #selectedStatus with multiselect', () => {

        it('should add new value selected status', () => {
          const preSelectedStatus: CMStatusSubType = {
            keyId: 1,
            content: 'Task',
            values: [1]
          };
          const newValue: CMExtension = {
            id: 2,
            content: 'Refused'
          };
          /*  */
          component.selectStatus(preSelectedStatus, newValue, true);
          expect(preSelectedStatus.values.length).toBe(2);
          expect(preSelectedStatus.values[0]).toBe(1);
          expect(preSelectedStatus.values[1]).toBe(2);
          expect(preSelectedStatus.content).toBe('Task, Refused');
        });

        it('should remove new value from selected status due to deselection', () => {

          const preMultiSelectedStatus: CMStatusSubType = {
            keyId: 1,
            content: 'Task, Refused',
            values: [1, 2]
          };
          const newValue: CMExtension = {
            id: 2,
            content: 'Refused'
          };
          /*  */
          component.selectStatus(preMultiSelectedStatus, newValue, true);
          expect(preMultiSelectedStatus.values.length).toBe(1);
          expect(preMultiSelectedStatus.values[0]).toBe(1);
          expect(preMultiSelectedStatus.content).toBe('Task');
        });

        it('selected status value should be removed due to atleast one selected element clause', () => {

          const preMultiSelectedStatus: CMStatusSubType = {
            keyId: 1,
            content: 'Task',
            values: [1]
          };
          const newValue: CMExtension = {
            id: 1,
            content: 'Task'
          };
          /*  */
          component.selectStatus(preMultiSelectedStatus, newValue, true);
          expect(preMultiSelectedStatus.values.length).toBe(1);
          expect(preMultiSelectedStatus.values[0]).toBe(1);
          expect(preMultiSelectedStatus.content).toBe('Task');
        });
      });

    });
  });
});
