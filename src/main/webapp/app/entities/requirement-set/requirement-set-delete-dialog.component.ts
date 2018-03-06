import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RequirementSet } from './requirement-set.model';
import { RequirementSetPopupService } from './requirement-set-popup.service';
import { RequirementSetService } from './requirement-set.service';

@Component({
    selector: 'jhi-requirement-set-delete-dialog',
    templateUrl: './requirement-set-delete-dialog.component.html'
})
export class RequirementSetDeleteDialogComponent {

    requirementSet: RequirementSet;

    constructor(
        private requirementSetService: RequirementSetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        /* tslint:disable-next-line:no-unused-variable*/
        this.requirementSetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'requirementSetListModification',
                content: 'Deleted an requirementSet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-requirement-set-delete-popup',
    template: ''
})
export class RequirementSetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requirementSetPopupService: RequirementSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.requirementSetPopupService
                .open(RequirementSetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
