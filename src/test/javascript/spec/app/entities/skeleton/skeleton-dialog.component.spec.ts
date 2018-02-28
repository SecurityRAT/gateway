/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { SkeletonDialogComponent } from '../../../../../../main/webapp/app/entities/skeleton/skeleton-dialog.component';
import { SkeletonService } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.service';
import { Skeleton } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.model';
import { RequirementSetService } from '../../../../../../main/webapp/app/entities/requirement-set';

describe('Component Tests', () => {

    describe('Skeleton Management Dialog Component', () => {
        let comp: SkeletonDialogComponent;
        let fixture: ComponentFixture<SkeletonDialogComponent>;
        let service: SkeletonService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkeletonDialogComponent],
                providers: [
                    RequirementSetService,
                    SkeletonService
                ]
            })
            .overrideTemplate(SkeletonDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkeletonDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkeletonService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Skeleton(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.skeleton = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'skeletonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Skeleton();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.skeleton = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'skeletonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
