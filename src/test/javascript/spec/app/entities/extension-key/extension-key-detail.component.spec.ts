/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ExtensionKeyDetailComponent } from '../../../../../../main/webapp/app/entities/extension-key/extension-key-detail.component';
import { ExtensionKeyService } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.service';
import { ExtensionKey } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.model';

describe('Component Tests', () => {

    describe('ExtensionKey Management Detail Component', () => {
        let comp: ExtensionKeyDetailComponent;
        let fixture: ComponentFixture<ExtensionKeyDetailComponent>;
        let service: ExtensionKeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ExtensionKeyDetailComponent],
                providers: [
                    ExtensionKeyService
                ]
            })
            .overrideTemplate(ExtensionKeyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtensionKeyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtensionKeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ExtensionKey(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.extensionKey).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
