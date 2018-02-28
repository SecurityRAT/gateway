import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { RequirementSet } from './requirement-set.model';
import { RequirementSetService } from './requirement-set.service';

@Component({
    selector: 'jhi-requirement-set-detail',
    templateUrl: './requirement-set-detail.component.html'
})
export class RequirementSetDetailComponent implements OnInit, OnDestroy {

    requirementSet: RequirementSet;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private requirementSetService: RequirementSetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRequirementSets();
    }

    load(id) {
        this.requirementSetService.find(id)
            .subscribe((requirementSetResponse: HttpResponse<RequirementSet>) => {
                this.requirementSet = requirementSetResponse.body;
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

    registerChangeInRequirementSets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'requirementSetListModification',
            (response) => this.load(this.requirementSet.id)
        );
    }
}
