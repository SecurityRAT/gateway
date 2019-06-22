import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';

@Component({
  selector: 'jhi-skeleton-detail',
  templateUrl: './skeleton-detail.component.html'
})
export class SkeletonDetailComponent implements OnInit {
  skeleton: ISkeleton;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ skeleton }) => {
      this.skeleton = skeleton;
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
