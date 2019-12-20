import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SkeletonService } from './skeleton.service';
import { SkeletonDeleteDialogComponent } from './skeleton-delete-dialog.component';

@Component({
  selector: 'jhi-skeleton',
  templateUrl: './skeleton.component.html'
})
export class SkeletonComponent implements OnInit, OnDestroy {
  skeletons: ISkeleton[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected skeletonService: SkeletonService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.skeletons = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.skeletonService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISkeleton[]>) => this.paginateSkeletons(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.skeletons = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSkeletons();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISkeleton) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSkeletons() {
    this.eventSubscriber = this.eventManager.subscribe('skeletonListModification', () => this.reset());
  }

  delete(skeleton: ISkeleton) {
    const modalRef = this.modalService.open(SkeletonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skeleton = skeleton;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSkeletons(data: ISkeleton[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.skeletons.push(data[i]);
    }
  }
}
