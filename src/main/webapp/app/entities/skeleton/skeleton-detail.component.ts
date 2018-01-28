import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Skeleton } from './skeleton.model';
import { SkeletonService } from './skeleton.service';

@Component({
    selector: 'jhi-skeleton-detail',
    templateUrl: './skeleton-detail.component.html'
})
export class SkeletonDetailComponent implements OnInit, OnDestroy {

    skeleton: Skeleton;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private skeletonService: SkeletonService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkeletons();
    }

    load(id) {
        this.skeletonService.find(id).subscribe((skeleton) => {
            this.skeleton = skeleton;
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

    registerChangeInSkeletons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skeletonListModification',
            (response) => this.load(this.skeleton.id)
        );
    }
}
