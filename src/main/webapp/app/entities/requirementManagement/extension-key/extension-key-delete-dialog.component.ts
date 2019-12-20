import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';

@Component({
  templateUrl: './extension-key-delete-dialog.component.html'
})
export class ExtensionKeyDeleteDialogComponent {
  extensionKey: IExtensionKey;

  constructor(
    protected extensionKeyService: ExtensionKeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extensionKeyService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'extensionKeyListModification',
        content: 'Deleted an extensionKey'
      });
      this.activeModal.dismiss(true);
    });
  }
}
