/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { AttributeKeyComponent } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key.component';
import { AttributeKeyService } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key.service';
import { AttributeKey } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key.model';

describe('Component Tests', () => {

    describe('AttributeKey Management Component', () => {
        let comp: AttributeKeyComponent;
        let fixture: ComponentFixture<AttributeKeyComponent>;
        let service: AttributeKeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AttributeKeyComponent],
                providers: [
                    AttributeKeyService
                ]
            })
            .overrideTemplate(AttributeKeyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttributeKeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeKeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AttributeKey(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.attributeKeys[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
