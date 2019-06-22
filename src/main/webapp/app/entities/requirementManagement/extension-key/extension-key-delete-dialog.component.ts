import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';

@Component({
  selector: 'jhi-extension-key-delete-dialog',
  templateUrl: './extension-key-delete-dialog.component.html'
})
export class ExtensionKeyDeleteDialogComponent {
  extensionKey: IExtensionKey;

  constructor(
    protected extensionKeyService: ExtensionKeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extensionKeyService.delete(id).subscribe(response => {
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extensionKey }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExtensionKeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.extensionKey = extensionKey;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/extension-key', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/extension-key', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
