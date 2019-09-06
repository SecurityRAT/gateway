import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';

@Component({
  selector: 'jhi-skeleton-delete-dialog',
  templateUrl: './skeleton-delete-dialog.component.html'
})
export class SkeletonDeleteDialogComponent {
  skeleton: ISkeleton;

  constructor(protected skeletonService: SkeletonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.skeletonService.delete(id).subscribe(response => {
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ skeleton }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SkeletonDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.skeleton = skeleton;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/skeleton', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/skeleton', { outlets: { popup: null } }]);
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
