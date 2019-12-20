import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';

@Component({
  templateUrl: './extension-delete-dialog.component.html'
})
export class ExtensionDeleteDialogComponent {
  extension: IExtension;

  constructor(protected extensionService: ExtensionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extensionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'extensionListModification',
        content: 'Deleted an extension'
      });
      this.activeModal.dismiss(true);
    });
  }
}
