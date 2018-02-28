/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { AttributeDetailComponent } from '../../../../../../main/webapp/app/entities/attribute/attribute-detail.component';
import { AttributeService } from '../../../../../../main/webapp/app/entities/attribute/attribute.service';
import { Attribute } from '../../../../../../main/webapp/app/entities/attribute/attribute.model';

describe('Component Tests', () => {

    describe('Attribute Management Detail Component', () => {
        let comp: AttributeDetailComponent;
        let fixture: ComponentFixture<AttributeDetailComponent>;
        let service: AttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AttributeDetailComponent],
                providers: [
                    AttributeService
                ]
            })
            .overrideTemplate(AttributeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttributeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Attribute(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.attribute).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
