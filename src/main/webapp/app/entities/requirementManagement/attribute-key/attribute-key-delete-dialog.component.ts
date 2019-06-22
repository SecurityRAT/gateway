import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';

@Component({
  selector: 'jhi-attribute-key-delete-dialog',
  templateUrl: './attribute-key-delete-dialog.component.html'
})
export class AttributeKeyDeleteDialogComponent {
  attributeKey: IAttributeKey;

  constructor(
    protected attributeKeyService: AttributeKeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attributeKeyService.delete(id).subscribe(response => {
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attributeKey }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AttributeKeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.attributeKey = attributeKey;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/attribute-key', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/attribute-key', { outlets: { popup: null } }]);
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
