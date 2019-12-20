import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExtension } from 'app/shared/model/requirementManagement/extension.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExtensionService } from './extension.service';
import { ExtensionDeleteDialogComponent } from './extension-delete-dialog.component';

@Component({
  selector: 'jhi-extension',
  templateUrl: './extension.component.html'
})
export class ExtensionComponent implements OnInit, OnDestroy {
  extensions: IExtension[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected extensionService: ExtensionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.extensions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.extensionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExtension[]>) => this.paginateExtensions(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.extensions = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInExtensions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExtension) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInExtensions() {
    this.eventSubscriber = this.eventManager.subscribe('extensionListModification', () => this.reset());
  }

  delete(extension: IExtension) {
    const modalRef = this.modalService.open(ExtensionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extension = extension;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExtensions(data: IExtension[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.extensions.push(data[i]);
    }
  }
}
