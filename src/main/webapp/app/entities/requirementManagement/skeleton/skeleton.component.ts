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
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent implements OnInit, OnDestroy {
  skeletons: ISkeleton[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

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
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.skeletonService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISkeleton[]>) => this.paginateSkeletons(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.skeletons = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSkeletons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkeleton): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSkeletons(): void {
    this.eventSubscriber = this.eventManager.subscribe('skeletonListModification', () => this.reset());
  }

  delete(skeleton: ISkeleton): void {
    const modalRef = this.modalService.open(SkeletonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skeleton = skeleton;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSkeletons(data: ISkeleton[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.skeletons.push(data[i]);
      }
    }
  }
}
