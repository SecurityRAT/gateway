/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { AttributeKeyDetailComponent } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key-detail.component';
import { AttributeKeyService } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key.service';
import { AttributeKey } from '../../../../../../main/webapp/app/entities/attribute-key/attribute-key.model';

describe('Component Tests', () => {

    describe('AttributeKey Management Detail Component', () => {
        let comp: AttributeKeyDetailComponent;
        let fixture: ComponentFixture<AttributeKeyDetailComponent>;
        let service: AttributeKeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AttributeKeyDetailComponent],
                providers: [
                    AttributeKeyService
                ]
            })
            .overrideTemplate(AttributeKeyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttributeKeyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeKeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AttributeKey(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.attributeKey).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
