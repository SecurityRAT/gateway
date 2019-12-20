import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';
import { AttributeService } from './attribute.service';

@Component({
  templateUrl: './attribute-delete-dialog.component.html'
})
export class AttributeDeleteDialogComponent {
  attribute: IAttribute;

  constructor(protected attributeService: AttributeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attributeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'attributeListModification',
        content: 'Deleted an attribute'
      });
      this.activeModal.dismiss(true);
    });
  }
}
