import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from './requirement-set.service';

@Component({
  templateUrl: './requirement-set-delete-dialog.component.html'
})
export class RequirementSetDeleteDialogComponent {
  requirementSet?: IRequirementSet;

  constructor(
    protected requirementSetService: RequirementSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requirementSetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('requirementSetListModification');
      this.activeModal.close();
    });
  }
}
