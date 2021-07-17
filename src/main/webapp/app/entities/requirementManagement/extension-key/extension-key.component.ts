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
  templateUrl: './extension-key.component.html',
})
export class ExtensionKeyComponent implements OnInit, OnDestroy {
  extensionKeys: IExtensionKey[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

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
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.extensionKeyService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IExtensionKey[]>) => this.paginateExtensionKeys(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.extensionKeys = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExtensionKeys();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExtensionKey): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInExtensionKeys(): void {
    this.eventSubscriber = this.eventManager.subscribe('extensionKeyListModification', () => this.reset());
  }

  delete(extensionKey: IExtensionKey): void {
    const modalRef = this.modalService.open(ExtensionKeyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extensionKey = extensionKey;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExtensionKeys(data: IExtensionKey[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.extensionKeys.push(data[i]);
      }
    }
  }
}
