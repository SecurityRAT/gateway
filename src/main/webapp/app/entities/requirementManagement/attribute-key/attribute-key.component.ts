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
  templateUrl: './attribute-key.component.html'
})
export class AttributeKeyComponent implements OnInit, OnDestroy {
  attributeKeys: IAttributeKey[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

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
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.attributeKeyService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAttributeKey[]>) => this.paginateAttributeKeys(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.attributeKeys = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAttributeKeys();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAttributeKey) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInAttributeKeys() {
    this.eventSubscriber = this.eventManager.subscribe('attributeKeyListModification', () => this.reset());
  }

  delete(attributeKey: IAttributeKey) {
    const modalRef = this.modalService.open(AttributeKeyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attributeKey = attributeKey;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAttributeKeys(data: IAttributeKey[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.attributeKeys.push(data[i]);
    }
  }
}
