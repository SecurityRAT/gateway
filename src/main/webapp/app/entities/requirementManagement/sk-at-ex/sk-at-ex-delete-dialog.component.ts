import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';

@Component({
  templateUrl: './sk-at-ex-delete-dialog.component.html'
})
export class SkAtExDeleteDialogComponent {
  skAtEx?: ISkAtEx;

  constructor(protected skAtExService: SkAtExService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skAtExService.delete(id).subscribe(() => {
      this.eventManager.broadcast('skAtExListModification');
      this.activeModal.close();
    });
  }
}
