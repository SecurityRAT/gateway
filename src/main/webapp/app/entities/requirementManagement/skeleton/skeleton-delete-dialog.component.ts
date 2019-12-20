import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';

@Component({
  templateUrl: './skeleton-delete-dialog.component.html'
})
export class SkeletonDeleteDialogComponent {
  skeleton: ISkeleton;

  constructor(protected skeletonService: SkeletonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.skeletonService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'skeletonListModification',
        content: 'Deleted an skeleton'
      });
      this.activeModal.dismiss(true);
    });
  }
}
