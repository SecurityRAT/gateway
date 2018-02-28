import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AttributeKey } from './attribute-key.model';
import { AttributeKeyPopupService } from './attribute-key-popup.service';
import { AttributeKeyService } from './attribute-key.service';
import { RequirementSet, RequirementSetService } from '../requirement-set';

@Component({
    selector: 'jhi-attribute-key-dialog',
    templateUrl: './attribute-key-dialog.component.html'
})
export class AttributeKeyDialogComponent implements OnInit {

    attributeKey: AttributeKey;
    isSaving: boolean;

    requirementsets: RequirementSet[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private attributeKeyService: AttributeKeyService,
        private requirementSetService: RequirementSetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.requirementSetService.query()
            .subscribe((res: HttpResponse<RequirementSet[]>) => { this.requirementsets = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.attributeKey.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attributeKeyService.update(this.attributeKey));
        } else {
            this.subscribeToSaveResponse(
                this.attributeKeyService.create(this.attributeKey));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AttributeKey>>) {
        result.subscribe((res: HttpResponse<AttributeKey>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AttributeKey) {
        this.eventManager.broadcast({ name: 'attributeKeyListModification', content: 'OK'});
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
    selector: 'jhi-attribute-key-popup',
    template: ''
})
export class AttributeKeyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attributeKeyPopupService: AttributeKeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.attributeKeyPopupService
                    .open(AttributeKeyDialogComponent as Component, params['id']);
            } else {
                this.attributeKeyPopupService
                    .open(AttributeKeyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
