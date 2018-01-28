/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { ExtensionKeyComponent } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.component';
import { ExtensionKeyService } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.service';
import { ExtensionKey } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.model';

describe('Component Tests', () => {

    describe('ExtensionKey Management Component', () => {
        let comp: ExtensionKeyComponent;
        let fixture: ComponentFixture<ExtensionKeyComponent>;
        let service: ExtensionKeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ExtensionKeyComponent],
                providers: [
                    ExtensionKeyService
                ]
            })
            .overrideTemplate(ExtensionKeyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtensionKeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtensionKeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ExtensionKey(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.extensionKeys[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
