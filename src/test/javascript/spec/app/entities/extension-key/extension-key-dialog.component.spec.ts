/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ExtensionKeyDialogComponent } from '../../../../../../main/webapp/app/entities/extension-key/extension-key-dialog.component';
import { ExtensionKeyService } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.service';
import { ExtensionKey } from '../../../../../../main/webapp/app/entities/extension-key/extension-key.model';
import { RequirementSetService } from '../../../../../../main/webapp/app/entities/requirement-set';

describe('Component Tests', () => {

    describe('ExtensionKey Management Dialog Component', () => {
        let comp: ExtensionKeyDialogComponent;
        let fixture: ComponentFixture<ExtensionKeyDialogComponent>;
        let service: ExtensionKeyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ExtensionKeyDialogComponent],
                providers: [
                    RequirementSetService,
                    ExtensionKeyService
                ]
            })
            .overrideTemplate(ExtensionKeyDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtensionKeyDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtensionKeyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtensionKey(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.extensionKey = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extensionKeyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtensionKey();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.extensionKey = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extensionKeyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
