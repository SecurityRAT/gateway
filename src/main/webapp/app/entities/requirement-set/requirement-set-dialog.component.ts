import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { RequirementSet } from './requirement-set.model';
import { RequirementSetPopupService } from './requirement-set-popup.service';
import { RequirementSetService } from './requirement-set.service';

@Component({
    selector: 'jhi-requirement-set-dialog',
    templateUrl: './requirement-set-dialog.component.html'
})
export class RequirementSetDialogComponent implements OnInit {

    requirementSet: RequirementSet;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private requirementSetService: RequirementSetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.requirementSet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.requirementSetService.update(this.requirementSet));
        } else {
            this.subscribeToSaveResponse(
                this.requirementSetService.create(this.requirementSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<RequirementSet>) {
        result.subscribe((res: RequirementSet) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RequirementSet) {
        this.eventManager.broadcast({ name: 'requirementSetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-requirement-set-popup',
    template: ''
})
export class RequirementSetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requirementSetPopupService: RequirementSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.requirementSetPopupService
                    .open(RequirementSetDialogComponent as Component, params['id']);
            } else {
                this.requirementSetPopupService
                    .open(RequirementSetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
