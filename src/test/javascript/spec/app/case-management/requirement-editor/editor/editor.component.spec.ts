import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { GatewayTestModule } from '../../../../test.module';
import { EditorComponent } from '../../../../../../../main/webapp/app/case-management/requirement-editor/editor/editor.component';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { CaseManagementBackendService } from '../../../../../../../main/webapp/app/case-management/common/services/case-management-backend.service';
import { MockActivatedRoute } from '../../../../helpers/mock-route.service';
import { CMRequirement, CMStatusSubType, CMExtensionKey, CMExtensionType, CMExtension } from '../../../../../../../main/webapp/app/case-management/common';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

describe('Component Tests', () => {

  describe('Editor Component', () => {
    let component: EditorComponent;
    let fixture: ComponentFixture<EditorComponent>;
    let cmBackendService: CaseManagementBackendService;
    // let cmUtilService: CMUtilService;
    // let mockRouter: any;
    const nonValidParams = new MockActivatedRoute({ 'requirementSet': 1 });
    const paramOnGenerate = new MockActivatedRoute({ 'requirementSet': '1', 'attributes': '1, 2, 3', 'attributeKeys': '1', 'name': 'testArtifact' });
    // beforeEach(() => {
    //   fixture = TestBed.createComponent(EditorComponent);
    //   component = fixture.componentInstance;
    //   // cmBackendService = fixture.debugElement.injector.get(CaseManagementBackendService);
    //   // cmUtilService = fixture.debugElement.injector.get(CMUtilService);
    //   // mockRouter = fixture.debugElement.injector.get(Router);
    // });

    describe('#ngOnit with nonValid routing valid parameters', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [GatewayTestModule],
          declarations: [EditorComponent],
          providers: [CMUtilService, CaseManagementBackendService,
            { provide: ActivatedRoute, useValue: nonValidParams }
          ]
        })
          .overrideTemplate(EditorComponent, '')
          .compileComponents();
        fixture = TestBed.createComponent(EditorComponent);
        component = fixture.componentInstance;
      }));

      it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });

      it('should do nothing on init', fakeAsync(() => {
        spyOn(component, 'loadParameters').and.returnValue('');
        spyOn(component, 'loadExtensions').and.returnValue('');
        spyOn(component, 'loadFilters').and.returnValue('');
        component.ngOnInit();

        tick();

        expect(component.loadParameters).toHaveBeenCalledTimes(0);
        expect(component.loadExtensions).toHaveBeenCalledTimes(0);
        expect(component.loadFilters).toHaveBeenCalledTimes(0);
      }));

    });

    describe('#ngOnit with valid parameters', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [GatewayTestModule],
          declarations: [EditorComponent],
          providers: [CMUtilService, CaseManagementBackendService,
            { provide: ActivatedRoute, useValue: paramOnGenerate }
          ]
        })
          .overrideTemplate(EditorComponent, '')
          .compileComponents();
        fixture = TestBed.createComponent(EditorComponent);
        component = fixture.componentInstance;
        cmBackendService = fixture.debugElement.injector.get(CaseManagementBackendService);
      }));

      it('should call backend service functions', fakeAsync(() => {
        // const returnValue: BaseDomain = {
        //   id: 2,
        //   name: 'test',
        //   showOrder: 10,
        //   description: '',
        // };
        spyOn(cmBackendService, 'query').and.returnValue(of(new HttpResponse({
          body: []
        })));
        spyOn(component, 'updateStatusInReqs').and.callThrough();
        component.ngOnInit();

        tick();

        expect(cmBackendService.query).toHaveBeenCalled();
        expect(component.updateStatusInReqs).toHaveBeenCalled();
      }));

      it('should update status in requirements', () => {
        const requirements = [
          new CMRequirement(1, 'req1', 1, 1, [], [], [], [new CMStatusSubType(1, [1])]),
          new CMRequirement(2, 'req2', 2, 2, [], [], [], [new CMStatusSubType(1, [2])]),
          /* selected status id does not exist */
          new CMRequirement(3, 'req3', 1, 3, [], [], [], [new CMStatusSubType(1, [3])]),
          new CMRequirement(4, 'req4', 4, 4, [], [], [], [])
        ];

        const status = [
          new CMExtensionKey(1, 'statusKey', '', 1, CMExtensionType.ENUM, [new CMExtension(1, 'testValue'), new CMExtension(2, 'testValue2')]),
          new CMExtensionKey(2, 'freetextStatusType', '', 1, CMExtensionType.FREETEXT, [new CMExtension(3, 'testValue')])
        ];

        component.requirements = requirements;
        component.status = status;

        spyOn(component, 'getStatusContentFromIds').and.callThrough();

        component.updateStatusInReqs();

        expect(component.getStatusContentFromIds).toHaveBeenCalled();
        expect(requirements[0].status[0].content).toEqual('testValue');
        expect(requirements[1].status[0].content).toEqual('testValue2');
        expect(requirements[2].status[1].content).toEqual('testValue');
        expect(requirements[3].status[0].content).toEqual('testValue');
        expect(component.categoryObject.categoryIdsInList.length).toBe(3);
      });
    });
  });
});
