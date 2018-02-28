import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AttributeKey } from './attribute-key.model';
import { AttributeKeyPopupService } from './attribute-key-popup.service';
import { AttributeKeyService } from './attribute-key.service';

@Component({
    selector: 'jhi-attribute-key-delete-dialog',
    templateUrl: './attribute-key-delete-dialog.component.html'
})
export class AttributeKeyDeleteDialogComponent {

    attributeKey: AttributeKey;

    constructor(
        private attributeKeyService: AttributeKeyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attributeKeyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'attributeKeyListModification',
                content: 'Deleted an attributeKey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attribute-key-delete-popup',
    template: ''
})
export class AttributeKeyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attributeKeyPopupService: AttributeKeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.attributeKeyPopupService
                .open(AttributeKeyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
