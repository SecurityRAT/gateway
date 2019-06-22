import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';

@Component({
  selector: 'jhi-extension-delete-dialog',
  templateUrl: './extension-delete-dialog.component.html'
})
export class ExtensionDeleteDialogComponent {
  extension: IExtension;

  constructor(protected extensionService: ExtensionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extensionService.delete(id).subscribe(response => {
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extension }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExtensionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.extension = extension;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/extension', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/extension', { outlets: { popup: null } }]);
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
