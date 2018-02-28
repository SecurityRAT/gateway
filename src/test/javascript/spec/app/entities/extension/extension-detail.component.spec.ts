/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ExtensionDetailComponent } from '../../../../../../main/webapp/app/entities/extension/extension-detail.component';
import { ExtensionService } from '../../../../../../main/webapp/app/entities/extension/extension.service';
import { Extension } from '../../../../../../main/webapp/app/entities/extension/extension.model';

describe('Component Tests', () => {

    describe('Extension Management Detail Component', () => {
        let comp: ExtensionDetailComponent;
        let fixture: ComponentFixture<ExtensionDetailComponent>;
        let service: ExtensionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ExtensionDetailComponent],
                providers: [
                    ExtensionService
                ]
            })
            .overrideTemplate(ExtensionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtensionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtensionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Extension(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.extension).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
