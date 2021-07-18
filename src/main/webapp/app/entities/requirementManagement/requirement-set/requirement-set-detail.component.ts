import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

@Component({
  selector: 'jhi-requirement-set-detail',
  templateUrl: './requirement-set-detail.component.html',
})
export class RequirementSetDetailComponent implements OnInit {
  requirementSet: IRequirementSet | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requirementSet }) => (this.requirementSet = requirementSet));
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
