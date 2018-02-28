/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { SkAtExDialogComponent } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex-dialog.component';
import { SkAtExService } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.service';
import { SkAtEx } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.model';
import { SkeletonService } from '../../../../../../main/webapp/app/entities/skeleton';
import { AttributeService } from '../../../../../../main/webapp/app/entities/attribute';
import { ExtensionService } from '../../../../../../main/webapp/app/entities/extension';

describe('Component Tests', () => {

    describe('SkAtEx Management Dialog Component', () => {
        let comp: SkAtExDialogComponent;
        let fixture: ComponentFixture<SkAtExDialogComponent>;
        let service: SkAtExService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkAtExDialogComponent],
                providers: [
                    SkeletonService,
                    AttributeService,
                    ExtensionService,
                    SkAtExService
                ]
            })
            .overrideTemplate(SkAtExDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkAtExDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkAtExService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SkAtEx(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.skAtEx = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'skAtExListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SkAtEx();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.skAtEx = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'skAtExListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
