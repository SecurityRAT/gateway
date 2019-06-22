import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';

@Component({
  selector: 'jhi-attribute-detail',
  templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent implements OnInit {
  attribute: IAttribute;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attribute }) => {
      this.attribute = attribute;
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
