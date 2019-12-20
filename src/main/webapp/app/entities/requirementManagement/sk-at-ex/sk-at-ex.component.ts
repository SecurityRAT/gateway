import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SkAtExService } from './sk-at-ex.service';
import { SkAtExDeleteDialogComponent } from './sk-at-ex-delete-dialog.component';

@Component({
  selector: 'jhi-sk-at-ex',
  templateUrl: './sk-at-ex.component.html'
})
export class SkAtExComponent implements OnInit, OnDestroy {
  skAtExes: ISkAtEx[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected skAtExService: SkAtExService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.skAtExes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.skAtExService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISkAtEx[]>) => this.paginateSkAtExes(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.skAtExes = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSkAtExes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISkAtEx) {
    return item.id;
  }

  registerChangeInSkAtExes() {
    this.eventSubscriber = this.eventManager.subscribe('skAtExListModification', () => this.reset());
  }

  delete(skAtEx: ISkAtEx) {
    const modalRef = this.modalService.open(SkAtExDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skAtEx = skAtEx;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSkAtExes(data: ISkAtEx[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.skAtExes.push(data[i]);
    }
  }
}
