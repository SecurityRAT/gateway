import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';

@Component({
  templateUrl: './extension-delete-dialog.component.html',
})
export class ExtensionDeleteDialogComponent {
  extension?: IExtension;

  constructor(protected extensionService: ExtensionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.extensionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('extensionListModification');
      this.activeModal.close();
    });
  }
}
