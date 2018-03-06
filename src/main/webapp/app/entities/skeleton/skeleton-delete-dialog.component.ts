import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Skeleton } from './skeleton.model';
import { SkeletonPopupService } from './skeleton-popup.service';
import { SkeletonService } from './skeleton.service';

@Component({
    selector: 'jhi-skeleton-delete-dialog',
    templateUrl: './skeleton-delete-dialog.component.html'
})
export class SkeletonDeleteDialogComponent {

    skeleton: Skeleton;

    constructor(
        private skeletonService: SkeletonService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        /* tslint:disable-next-line:no-unused-variable*/
        this.skeletonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skeletonListModification',
                content: 'Deleted an skeleton'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skeleton-delete-popup',
    template: ''
})
export class SkeletonDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skeletonPopupService: SkeletonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skeletonPopupService
                .open(SkeletonDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
