import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ExtensionKey } from './extension-key.model';
import { ExtensionKeyService } from './extension-key.service';

@Component({
    selector: 'jhi-extension-key-detail',
    templateUrl: './extension-key-detail.component.html'
})
export class ExtensionKeyDetailComponent implements OnInit, OnDestroy {

    extensionKey: ExtensionKey;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private extensionKeyService: ExtensionKeyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExtensionKeys();
    }

    load(id) {
        this.extensionKeyService.find(id)
            .subscribe((extensionKeyResponse: HttpResponse<ExtensionKey>) => {
                this.extensionKey = extensionKeyResponse.body;
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

    registerChangeInExtensionKeys() {
        this.eventSubscriber = this.eventManager.subscribe(
            'extensionKeyListModification',
            /* tslint:disable-next-line:no-unused-variable */
            (response) => this.load(this.extensionKey.id)
        );
    }
}
