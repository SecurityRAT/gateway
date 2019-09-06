import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

@Component({
  selector: 'jhi-extension-key-detail',
  templateUrl: './extension-key-detail.component.html'
})
export class ExtensionKeyDetailComponent implements OnInit {
  extensionKey: IExtensionKey;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extensionKey }) => {
      this.extensionKey = extensionKey;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
