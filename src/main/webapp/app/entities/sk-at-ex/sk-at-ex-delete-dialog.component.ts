import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkAtEx } from './sk-at-ex.model';
import { SkAtExPopupService } from './sk-at-ex-popup.service';
import { SkAtExService } from './sk-at-ex.service';

@Component({
    selector: 'jhi-sk-at-ex-delete-dialog',
    templateUrl: './sk-at-ex-delete-dialog.component.html'
})
export class SkAtExDeleteDialogComponent {

    skAtEx: SkAtEx;

    constructor(
        private skAtExService: SkAtExService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        /* tslint:disable-next-line:no-unused-variable */
        this.skAtExService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skAtExListModification',
                content: 'Deleted an skAtEx'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sk-at-ex-delete-popup',
    template: ''
})
export class SkAtExDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skAtExPopupService: SkAtExPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skAtExPopupService
                .open(SkAtExDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
