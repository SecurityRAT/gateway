import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AttributeKeyService } from './attribute-key.service';
import { AttributeKeyDeleteDialogComponent } from './attribute-key-delete-dialog.component';

@Component({
  selector: 'jhi-attribute-key',
  templateUrl: './attribute-key.component.html',
})
export class AttributeKeyComponent implements OnInit, OnDestroy {
  attributeKeys: IAttributeKey[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected attributeKeyService: AttributeKeyService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.attributeKeys = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.attributeKeyService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IAttributeKey[]>) => this.paginateAttributeKeys(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.attributeKeys = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAttributeKeys();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAttributeKey): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInAttributeKeys(): void {
    this.eventSubscriber = this.eventManager.subscribe('attributeKeyListModification', () => this.reset());
  }

  delete(attributeKey: IAttributeKey): void {
    const modalRef = this.modalService.open(AttributeKeyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attributeKey = attributeKey;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAttributeKeys(data: IAttributeKey[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.attributeKeys.push(data[i]);
      }
    }
  }
}
