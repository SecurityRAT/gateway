import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';

@Component({
  templateUrl: './sk-at-ex-delete-dialog.component.html'
})
export class SkAtExDeleteDialogComponent {
  skAtEx: ISkAtEx;

  constructor(protected skAtExService: SkAtExService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.skAtExService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'skAtExListModification',
        content: 'Deleted an skAtEx'
      });
      this.activeModal.dismiss(true);
    });
  }
}
