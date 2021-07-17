import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';

@Component({
  templateUrl: './attribute-key-delete-dialog.component.html',
})
export class AttributeKeyDeleteDialogComponent {
  attributeKey?: IAttributeKey;

  constructor(
    protected attributeKeyService: AttributeKeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.attributeKeyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('attributeKeyListModification');
      this.activeModal.close();
    });
  }
}
