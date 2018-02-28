/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { RequirementSetComponent } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set.component';
import { RequirementSetService } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set.service';
import { RequirementSet } from '../../../../../../main/webapp/app/entities/requirement-set/requirement-set.model';

describe('Component Tests', () => {

    describe('RequirementSet Management Component', () => {
        let comp: RequirementSetComponent;
        let fixture: ComponentFixture<RequirementSetComponent>;
        let service: RequirementSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RequirementSetComponent],
                providers: [
                    RequirementSetService
                ]
            })
            .overrideTemplate(RequirementSetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RequirementSetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RequirementSet(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.requirementSets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
