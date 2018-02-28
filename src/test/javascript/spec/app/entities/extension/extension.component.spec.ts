/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ExtensionComponent } from '../../../../../../main/webapp/app/entities/extension/extension.component';
import { ExtensionService } from '../../../../../../main/webapp/app/entities/extension/extension.service';
import { Extension } from '../../../../../../main/webapp/app/entities/extension/extension.model';

describe('Component Tests', () => {

    describe('Extension Management Component', () => {
        let comp: ExtensionComponent;
        let fixture: ComponentFixture<ExtensionComponent>;
        let service: ExtensionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ExtensionComponent],
                providers: [
                    ExtensionService
                ]
            })
            .overrideTemplate(ExtensionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtensionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtensionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Extension(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.extensions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
