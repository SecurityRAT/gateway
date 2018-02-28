import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SkAtEx } from './sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';

@Component({
    selector: 'jhi-sk-at-ex-detail',
    templateUrl: './sk-at-ex-detail.component.html'
})
export class SkAtExDetailComponent implements OnInit, OnDestroy {

    skAtEx: SkAtEx;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skAtExService: SkAtExService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkAtExes();
    }

    load(id) {
        this.skAtExService.find(id)
            .subscribe((skAtExResponse: HttpResponse<SkAtEx>) => {
                this.skAtEx = skAtExResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkAtExes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skAtExListModification',
            (response) => this.load(this.skAtEx.id)
        );
    }
}
