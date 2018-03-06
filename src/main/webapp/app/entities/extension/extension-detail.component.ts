import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Extension } from './extension.model';
import { ExtensionService } from './extension.service';

@Component({
    selector: 'jhi-extension-detail',
    templateUrl: './extension-detail.component.html'
})
export class ExtensionDetailComponent implements OnInit, OnDestroy {

    extension: Extension;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private extensionService: ExtensionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExtensions();
    }

    load(id) {
        this.extensionService.find(id)
            .subscribe((extensionResponse: HttpResponse<Extension>) => {
                this.extension = extensionResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExtensions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'extensionListModification',
            /* tslint:disable-next-line:no-unused-variable */
            (response) => this.load(this.extension.id)
        );
    }
}
