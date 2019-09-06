import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';

@Component({
  selector: 'jhi-sk-at-ex-delete-dialog',
  templateUrl: './sk-at-ex-delete-dialog.component.html'
})
export class SkAtExDeleteDialogComponent {
  skAtEx: ISkAtEx;

  constructor(protected skAtExService: SkAtExService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.skAtExService.delete(id).subscribe(response => {
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ skAtEx }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SkAtExDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.skAtEx = skAtEx;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sk-at-ex', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sk-at-ex', { outlets: { popup: null } }]);
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
