import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

@Component({
  selector: 'jhi-extension-key-detail',
  templateUrl: './extension-key-detail.component.html',
})
export class ExtensionKeyDetailComponent implements OnInit {
  extensionKey: IExtensionKey | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extensionKey }) => (this.extensionKey = extensionKey));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
