import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AttributeKey } from './attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';

@Component({
    selector: 'jhi-attribute-key-detail',
    templateUrl: './attribute-key-detail.component.html'
})
export class AttributeKeyDetailComponent implements OnInit, OnDestroy {

    attributeKey: AttributeKey;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private attributeKeyService: AttributeKeyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttributeKeys();
    }

    load(id) {
        this.attributeKeyService.find(id)
            .subscribe((attributeKeyResponse: HttpResponse<AttributeKey>) => {
                this.attributeKey = attributeKeyResponse.body;
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

    registerChangeInAttributeKeys() {
        this.eventSubscriber = this.eventManager.subscribe(
            'attributeKeyListModification',
            (response) => this.load(this.attributeKey.id)
        );
    }
}
