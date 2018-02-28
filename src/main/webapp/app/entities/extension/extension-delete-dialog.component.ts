import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Extension } from './extension.model';
import { ExtensionPopupService } from './extension-popup.service';
import { ExtensionService } from './extension.service';

@Component({
    selector: 'jhi-extension-delete-dialog',
    templateUrl: './extension-delete-dialog.component.html'
})
export class ExtensionDeleteDialogComponent {

    extension: Extension;

    constructor(
        private extensionService: ExtensionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.extensionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'extensionListModification',
                content: 'Deleted an extension'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-extension-delete-popup',
    template: ''
})
export class ExtensionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extensionPopupService: ExtensionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.extensionPopupService
                .open(ExtensionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
