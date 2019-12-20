import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExtensionKeyService } from './extension-key.service';
import { ExtensionKeyDeleteDialogComponent } from './extension-key-delete-dialog.component';

@Component({
  selector: 'jhi-extension-key',
  templateUrl: './extension-key.component.html'
})
export class ExtensionKeyComponent implements OnInit, OnDestroy {
  extensionKeys: IExtensionKey[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected extensionKeyService: ExtensionKeyService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.extensionKeys = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.extensionKeyService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExtensionKey[]>) => this.paginateExtensionKeys(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.extensionKeys = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInExtensionKeys();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExtensionKey) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInExtensionKeys() {
    this.eventSubscriber = this.eventManager.subscribe('extensionKeyListModification', () => this.reset());
  }

  delete(extensionKey: IExtensionKey) {
    const modalRef = this.modalService.open(ExtensionKeyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extensionKey = extensionKey;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExtensionKeys(data: IExtensionKey[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.extensionKeys.push(data[i]);
    }
  }
}
