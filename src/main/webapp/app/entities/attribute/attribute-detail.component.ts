import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Attribute } from './attribute.model';
import { AttributeService } from './attribute.service';

@Component({
    selector: 'jhi-attribute-detail',
    templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent implements OnInit, OnDestroy {

    attribute: Attribute;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private attributeService: AttributeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttributes();
    }

    load(id) {
        this.attributeService.find(id)
            .subscribe((attributeResponse: HttpResponse<Attribute>) => {
                this.attribute = attributeResponse.body;
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

    registerChangeInAttributes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'attributeListModification',
            /* tslint:disable-next-line:no-unused-variable*/
            (response) => this.load(this.attribute.id)
        );
    }
}
