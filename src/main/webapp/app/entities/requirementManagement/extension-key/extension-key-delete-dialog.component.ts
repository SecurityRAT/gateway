import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';

@Component({
  templateUrl: './extension-key-delete-dialog.component.html',
})
export class ExtensionKeyDeleteDialogComponent {
  extensionKey?: IExtensionKey;

  constructor(
    protected extensionKeyService: ExtensionKeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.extensionKeyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('extensionKeyListModification');
      this.activeModal.close();
    });
  }
}
