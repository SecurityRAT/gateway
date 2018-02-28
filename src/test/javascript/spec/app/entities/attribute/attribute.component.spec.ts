/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { AttributeComponent } from '../../../../../../main/webapp/app/entities/attribute/attribute.component';
import { AttributeService } from '../../../../../../main/webapp/app/entities/attribute/attribute.service';
import { Attribute } from '../../../../../../main/webapp/app/entities/attribute/attribute.model';

describe('Component Tests', () => {

    describe('Attribute Management Component', () => {
        let comp: AttributeComponent;
        let fixture: ComponentFixture<AttributeComponent>;
        let service: AttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AttributeComponent],
                providers: [
                    AttributeService
                ]
            })
            .overrideTemplate(AttributeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttributeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Attribute(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.attributes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
