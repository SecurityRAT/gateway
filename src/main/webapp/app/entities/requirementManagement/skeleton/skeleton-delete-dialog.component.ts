import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';

@Component({
  templateUrl: './skeleton-delete-dialog.component.html'
})
export class SkeletonDeleteDialogComponent {
  skeleton?: ISkeleton;

  constructor(protected skeletonService: SkeletonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skeletonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('skeletonListModification');
      this.activeModal.close();
    });
  }
}
