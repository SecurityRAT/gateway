import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Extension } from './extension.model';
import { ExtensionPopupService } from './extension-popup.service';
import { ExtensionService } from './extension.service';
import { ExtensionKey, ExtensionKeyService } from '../extension-key';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-extension-dialog',
    templateUrl: './extension-dialog.component.html'
})
export class ExtensionDialogComponent implements OnInit {

    extension: Extension;
    isSaving: boolean;

    extensionkeys: ExtensionKey[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private extensionService: ExtensionService,
        private extensionKeyService: ExtensionKeyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.extensionKeyService.query()
            .subscribe((res: ResponseWrapper) => { this.extensionkeys = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.extension.id !== undefined) {
            this.subscribeToSaveResponse(
                this.extensionService.update(this.extension));
        } else {
            this.subscribeToSaveResponse(
                this.extensionService.create(this.extension));
        }
    }

    private subscribeToSaveResponse(result: Observable<Extension>) {
        result.subscribe((res: Extension) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Extension) {
        this.eventManager.broadcast({ name: 'extensionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExtensionKeyById(index: number, item: ExtensionKey) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-extension-popup',
    template: ''
})
export class ExtensionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extensionPopupService: ExtensionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.extensionPopupService
                    .open(ExtensionDialogComponent as Component, params['id']);
            } else {
                this.extensionPopupService
                    .open(ExtensionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
