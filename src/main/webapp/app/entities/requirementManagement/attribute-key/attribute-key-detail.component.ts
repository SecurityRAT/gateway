import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

@Component({
  selector: 'jhi-attribute-key-detail',
  templateUrl: './attribute-key-detail.component.html'
})
export class AttributeKeyDetailComponent implements OnInit {
  attributeKey: IAttributeKey;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attributeKey }) => {
      this.attributeKey = attributeKey;
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
