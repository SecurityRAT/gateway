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
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

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
    this.ascending = true;
  }

  loadAll(): void {
    this.skAtExService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISkAtEx[]>) => this.paginateSkAtExes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.skAtExes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSkAtExes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkAtEx): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkAtExes(): void {
    this.eventSubscriber = this.eventManager.subscribe('skAtExListModification', () => this.reset());
  }

  delete(skAtEx: ISkAtEx): void {
    const modalRef = this.modalService.open(SkAtExDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skAtEx = skAtEx;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSkAtExes(data: ISkAtEx[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.skAtExes.push(data[i]);
      }
    }
  }
}
