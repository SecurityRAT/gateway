import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkAtEx } from './sk-at-ex.model';
import { SkAtExPopupService } from './sk-at-ex-popup.service';
import { SkAtExService } from './sk-at-ex.service';
import { Skeleton, SkeletonService } from '../skeleton';
import { Attribute, AttributeService } from '../attribute';
import { Extension, ExtensionService } from '../extension';

@Component({
    selector: 'jhi-sk-at-ex-dialog',
    templateUrl: './sk-at-ex-dialog.component.html'
})
export class SkAtExDialogComponent implements OnInit {

    skAtEx: SkAtEx;
    isSaving: boolean;

    skeletons: Skeleton[];

    attributes: Attribute[];

    extensions: Extension[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private skAtExService: SkAtExService,
        private skeletonService: SkeletonService,
        private attributeService: AttributeService,
        private extensionService: ExtensionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.skeletonService.query()
            .subscribe((res: HttpResponse<Skeleton[]>) => { this.skeletons = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.attributeService.query()
            .subscribe((res: HttpResponse<Attribute[]>) => { this.attributes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.extensionService.query()
            .subscribe((res: HttpResponse<Extension[]>) => { this.extensions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skAtEx.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skAtExService.update(this.skAtEx));
        } else {
            this.subscribeToSaveResponse(
                this.skAtExService.create(this.skAtEx));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SkAtEx>>) {
        result.subscribe((res: HttpResponse<SkAtEx>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SkAtEx) {
        this.eventManager.broadcast({ name: 'skAtExListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSkeletonById(index: number, item: Skeleton) {
        return item.id;
    }

    trackAttributeById(index: number, item: Attribute) {
        return item.id;
    }

    trackExtensionById(index: number, item: Extension) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sk-at-ex-popup',
    template: ''
})
export class SkAtExPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skAtExPopupService: SkAtExPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skAtExPopupService
                    .open(SkAtExDialogComponent as Component, params['id']);
            } else {
                this.skAtExPopupService
                    .open(SkAtExDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
