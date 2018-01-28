import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Skeleton } from './skeleton.model';
import { SkeletonPopupService } from './skeleton-popup.service';
import { SkeletonService } from './skeleton.service';
import { RequirementSet, RequirementSetService } from '../requirement-set';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-skeleton-dialog',
    templateUrl: './skeleton-dialog.component.html'
})
export class SkeletonDialogComponent implements OnInit {

    skeleton: Skeleton;
    isSaving: boolean;

    requirementsets: RequirementSet[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private skeletonService: SkeletonService,
        private requirementSetService: RequirementSetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.requirementSetService.query()
            .subscribe((res: ResponseWrapper) => { this.requirementsets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skeleton.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skeletonService.update(this.skeleton));
        } else {
            this.subscribeToSaveResponse(
                this.skeletonService.create(this.skeleton));
        }
    }

    private subscribeToSaveResponse(result: Observable<Skeleton>) {
        result.subscribe((res: Skeleton) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Skeleton) {
        this.eventManager.broadcast({ name: 'skeletonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRequirementSetById(index: number, item: RequirementSet) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-skeleton-popup',
    template: ''
})
export class SkeletonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skeletonPopupService: SkeletonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skeletonPopupService
                    .open(SkeletonDialogComponent as Component, params['id']);
            } else {
                this.skeletonPopupService
                    .open(SkeletonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
