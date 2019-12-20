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
  templateUrl: './attribute.component.html'
})
export class AttributeComponent implements OnInit, OnDestroy {
  attributes: IAttribute[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

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
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.attributeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAttribute[]>) => this.paginateAttributes(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.attributes = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAttributes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAttribute) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInAttributes() {
    this.eventSubscriber = this.eventManager.subscribe('attributeListModification', () => this.reset());
  }

  delete(attribute: IAttribute) {
    const modalRef = this.modalService.open(AttributeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attribute = attribute;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAttributes(data: IAttribute[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.attributes.push(data[i]);
    }
  }
}
