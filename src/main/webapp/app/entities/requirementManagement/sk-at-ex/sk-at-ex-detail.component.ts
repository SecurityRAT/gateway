import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';

@Component({
  selector: 'jhi-sk-at-ex-detail',
  templateUrl: './sk-at-ex-detail.component.html'
})
export class SkAtExDetailComponent implements OnInit {
  skAtEx: ISkAtEx;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ skAtEx }) => {
      this.skAtEx = skAtEx;
    });
  }

  previousState() {
    window.history.back();
  }
}
