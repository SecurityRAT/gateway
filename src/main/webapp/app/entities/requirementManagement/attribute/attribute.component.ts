import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AttributeService } from './attribute.service';
import { AttributeDeleteDialogComponent } from './attribute-delete-dialog.component';

@Component({
  selector: 'jhi-attribute',
  templateUrl: './attribute.component.html',
})
export class AttributeComponent implements OnInit, OnDestroy {
  attributes: IAttribute[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected attributeService: AttributeService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.attributes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.attributeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IAttribute[]>) => this.paginateAttributes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.attributes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAttributes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAttribute): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInAttributes(): void {
    this.eventSubscriber = this.eventManager.subscribe('attributeListModification', () => this.reset());
  }

  delete(attribute: IAttribute): void {
    const modalRef = this.modalService.open(AttributeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attribute = attribute;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAttributes(data: IAttribute[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.attributes.push(data[i]);
      }
    }
  }
}
