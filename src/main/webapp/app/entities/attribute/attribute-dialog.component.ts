import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Attribute } from './attribute.model';
import { AttributePopupService } from './attribute-popup.service';
import { AttributeService } from './attribute.service';
import { AttributeKey, AttributeKeyService } from '../attribute-key';

@Component({
    selector: 'jhi-attribute-dialog',
    templateUrl: './attribute-dialog.component.html'
})
export class AttributeDialogComponent implements OnInit {

    attribute: Attribute;
    isSaving: boolean;

    attributes: Attribute[];

    attributekeys: AttributeKey[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private attributeService: AttributeService,
        private attributeKeyService: AttributeKeyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.attributeService.query()
            .subscribe((res: HttpResponse<Attribute[]>) => { this.attributes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.attributeKeyService.query()
            .subscribe((res: HttpResponse<AttributeKey[]>) => { this.attributekeys = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.attribute.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attributeService.update(this.attribute));
        } else {
            this.subscribeToSaveResponse(
                this.attributeService.create(this.attribute));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Attribute>>) {
        result.subscribe((res: HttpResponse<Attribute>) =>
            this.onSaveSuccess(res.body), () => this.onSaveError()); // add "res: HttpErrorResponse" parameter to get the rejected object
    }

    private onSaveSuccess(result: Attribute) {
        this.eventManager.broadcast({ name: 'attributeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    /* tslint:disable-next-line:no-unused-variable*/
    trackAttributeById(index: number, item: Attribute) {
        return item.id;
    }

    /* tslint:disable-next-line:no-unused-variable*/
    trackAttributeKeyById(index: number, item: AttributeKey) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-attribute-popup',
    template: ''
})
export class AttributePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attributePopupService: AttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.attributePopupService
                    .open(AttributeDialogComponent as Component, params['id']);
            } else {
                this.attributePopupService
                    .open(AttributeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
