import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExtension } from 'app/shared/model/requirementManagement/extension.model';

@Component({
  selector: 'jhi-extension-detail',
  templateUrl: './extension-detail.component.html'
})
export class ExtensionDetailComponent implements OnInit {
  extension: IExtension;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extension }) => {
      this.extension = extension;
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
