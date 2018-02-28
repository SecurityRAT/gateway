import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ExtensionKey } from './extension-key.model';
import { ExtensionKeyPopupService } from './extension-key-popup.service';
import { ExtensionKeyService } from './extension-key.service';
import { RequirementSet, RequirementSetService } from '../requirement-set';

@Component({
    selector: 'jhi-extension-key-dialog',
    templateUrl: './extension-key-dialog.component.html'
})
export class ExtensionKeyDialogComponent implements OnInit {

    extensionKey: ExtensionKey;
    isSaving: boolean;

    requirementsets: RequirementSet[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private extensionKeyService: ExtensionKeyService,
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
        if (this.extensionKey.id !== undefined) {
            this.subscribeToSaveResponse(
                this.extensionKeyService.update(this.extensionKey));
        } else {
            this.subscribeToSaveResponse(
                this.extensionKeyService.create(this.extensionKey));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExtensionKey>>) {
        result.subscribe((res: HttpResponse<ExtensionKey>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExtensionKey) {
        this.eventManager.broadcast({ name: 'extensionKeyListModification', content: 'OK'});
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
    selector: 'jhi-extension-key-popup',
    template: ''
})
export class ExtensionKeyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extensionKeyPopupService: ExtensionKeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.extensionKeyPopupService
                    .open(ExtensionKeyDialogComponent as Component, params['id']);
            } else {
                this.extensionKeyPopupService
                    .open(ExtensionKeyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
