/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { RequirementSetDetailComponent } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set-detail.component';
import { RequirementSetService } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set.service';
import { RequirementSet } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set.model';

describe('Component Tests', () => {

    describe('RequirementSet Management Detail Component', () => {
        let comp: RequirementSetDetailComponent;
        let fixture: ComponentFixture<RequirementSetDetailComponent>;
        let service: RequirementSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RequirementSetDetailComponent],
                providers: [
                    RequirementSetService
                ]
            })
            .overrideTemplate(RequirementSetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RequirementSetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RequirementSet(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.requirementSet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
