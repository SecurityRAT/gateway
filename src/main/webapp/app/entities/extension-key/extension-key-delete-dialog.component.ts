import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtensionKey } from './extension-key.model';
import { ExtensionKeyPopupService } from './extension-key-popup.service';
import { ExtensionKeyService } from './extension-key.service';

@Component({
    selector: 'jhi-extension-key-delete-dialog',
    templateUrl: './extension-key-delete-dialog.component.html'
})
export class ExtensionKeyDeleteDialogComponent {

    extensionKey: ExtensionKey;

    constructor(
        private extensionKeyService: ExtensionKeyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        /* tslint:disable-next-line:no-unused-variable */
        this.extensionKeyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'extensionKeyListModification',
                content: 'Deleted an extensionKey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-extension-key-delete-popup',
    template: ''
})
export class ExtensionKeyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extensionKeyPopupService: ExtensionKeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.extensionKeyPopupService
                .open(ExtensionKeyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
