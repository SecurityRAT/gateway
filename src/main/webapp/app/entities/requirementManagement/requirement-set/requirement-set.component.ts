import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RequirementSetService } from './requirement-set.service';
import { RequirementSetDeleteDialogComponent } from './requirement-set-delete-dialog.component';

@Component({
  selector: 'jhi-requirement-set',
  templateUrl: './requirement-set.component.html'
})
export class RequirementSetComponent implements OnInit, OnDestroy {
  requirementSets: IRequirementSet[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected requirementSetService: RequirementSetService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.requirementSets = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.requirementSetService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IRequirementSet[]>) => this.paginateRequirementSets(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.requirementSets = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRequirementSets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRequirementSet) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInRequirementSets() {
    this.eventSubscriber = this.eventManager.subscribe('requirementSetListModification', () => this.reset());
  }

  delete(requirementSet: IRequirementSet) {
    const modalRef = this.modalService.open(RequirementSetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.requirementSet = requirementSet;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRequirementSets(data: IRequirementSet[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.requirementSets.push(data[i]);
    }
  }
}
