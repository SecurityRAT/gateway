import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { HttpResponse } from '@angular/common/http';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CMRequirementSet } from '../../../../../../../main/webapp/app/case-management/common/models/requirement-set.model';
import { StartUpComponent } from '../../../../../../../main/webapp/app/case-management/starter/start-up/start-up.component';
import { CaseManagementBackendService } from '../../../../../../../main/webapp/app/case-management/common/services/case-management-backend.service';
import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { Router } from '@angular/router';
import { CMAttribute, CMAttributeKey, CMAttributeType } from '../../../../../../../main/webapp/app/case-management/common';

describe('Component Tests', () => {
    describe('Startup Component', () => {
        let component: StartUpComponent;
        let fixture: ComponentFixture<StartUpComponent>;
        let cmBackendService: CaseManagementBackendService;
        let util: CMUtilService;
        let mockRouter: any;

        beforeEach(async(() => {
            // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [StartUpComponent],
                providers: [
                    CaseManagementBackendService,
                    CMUtilService,
                    JhiFilterPipe,
                    JhiOrderByPipe
                ]
            })
                .overrideTemplate(StartUpComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StartUpComponent);
            component = fixture.componentInstance;
            cmBackendService = fixture.debugElement.injector.get(CaseManagementBackendService);
            util = fixture.debugElement.injector.get(CMUtilService);
            mockRouter = fixture.debugElement.injector.get(Router);
        });

        describe('OnInit', () => {
            it('#getRequirementSets and #loadAll should be called', () => {

                spyOn(cmBackendService, 'getRequirementSets').and.returnValue(of(new HttpResponse({
                    body: [new CMRequirementSet(1, 'test', 10)]
                })));
                component.ngOnInit();

                expect(cmBackendService.getRequirementSets).toHaveBeenCalled();
            });

            it('No requirement set should be selected and initial values are unchanged', fakeAsync(() => {
                // GIVEN
                spyOn(cmBackendService, 'getRequirementSets').and.returnValue(of(new HttpResponse({
                    body: [new CMRequirementSet(1, 'test', 10), new CMRequirementSet(2, 'test2', 20)]
                })));

                component.ngOnInit();
                tick();

                // THEN
                expect(component.requirementSets.length).toBe(2);
                expect(component.selectedRequirementSet).toBeNull();
                expect(component.attributeKeys.length).toBe(0);
                expect(component.attributes.length).toBe(0);
                expect(component.initialActiveTab).toBeUndefined();
            }));

            it('Requirement set and initial tab should have been selected', fakeAsync(() => {
                // GIVEN
                spyOn(cmBackendService, 'getRequirementSets').and.returnValue(of(new HttpResponse({
                    body: [new CMRequirementSet(1, 'test', 10)]
                })));

                component.ngOnInit();
                tick();

                // THEN
                expect(component.selectedRequirementSet).toBeDefined();
                expect(component.selectedRequirementSet.id).toBe(1);
                expect(component.initialActiveTab).toBeDefined();
            }));
        });

        describe('Test methods', () => {
            it('should call the #getAttributes and #getAttributeKeys service methods after calling #loadAll', fakeAsync(() => {
                // GIVEN
                const reqSet = new CMRequirementSet(1, 'test', 10);
                component.selectedRequirementSet = reqSet;
                spyOn(cmBackendService, 'findAttributes').and.returnValue(of(new HttpResponse({
                    body: [new CMAttribute(1, 'some attribue', 10)]
                })));
                spyOn(cmBackendService, 'findAttributeKeys').and.returnValue(of(new HttpResponse({
                    body: [new CMAttributeKey(1, 'some attribue', 10)]
                })));

                // WHEN
                component.loadAll();
                tick();

                // THEN
                expect(cmBackendService.findAttributeKeys).toHaveBeenCalledWith(reqSet.id, CMAttributeType.PARAMETER);
                expect(cmBackendService.findAttributes).toHaveBeenCalledWith(reqSet.id, CMAttributeType.PARAMETER);
                expect(component.attributes[0].id).toBe(1);
                expect(component.attributeKeys[0].id).toBe(1);
            }));

            it('should navigate to route', () => {
                // GIVEN
                const reqSet = new CMRequirementSet(1, 'test', 10);
                const artifactName = 'testArtifact';
                const attributes = [new CMAttribute(1, 'test', 10, 1, '', [], true), new CMAttribute(2, 'test2', 20, 2, '', [], true)];
                component.selectedRequirementSet = reqSet;
                component.artifactSettings.name = artifactName;
                component.attributes = attributes;

                spyOn(util, 'filterAttributesByObj').and.returnValue(attributes);

                // WHEN
                component.generate();

                // THEN
                expect(util.filterAttributesByObj).toHaveBeenCalledWith(attributes, {selected: true});
                expect(mockRouter.navigateSpy).toHaveBeenCalled();
            });
        });
    });
});
