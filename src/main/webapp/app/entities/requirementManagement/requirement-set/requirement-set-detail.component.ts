import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

@Component({
  selector: 'jhi-requirement-set-detail',
  templateUrl: './requirement-set-detail.component.html'
})
export class RequirementSetDetailComponent implements OnInit {
  requirementSet: IRequirementSet;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ requirementSet }) => {
      this.requirementSet = requirementSet;
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
