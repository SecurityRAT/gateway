import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

@Component({
  selector: 'jhi-attribute-key-detail',
  templateUrl: './attribute-key-detail.component.html'
})
export class AttributeKeyDetailComponent implements OnInit {
  attributeKey: IAttributeKey | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attributeKey }) => {
      this.attributeKey = attributeKey;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
