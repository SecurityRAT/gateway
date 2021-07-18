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
  templateUrl: './extension.component.html',
})
export class ExtensionComponent implements OnInit, OnDestroy {
  extensions: IExtension[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

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
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.extensionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IExtension[]>) => this.paginateExtensions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.extensions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExtensions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExtension): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInExtensions(): void {
    this.eventSubscriber = this.eventManager.subscribe('extensionListModification', () => this.reset());
  }

  delete(extension: IExtension): void {
    const modalRef = this.modalService.open(ExtensionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extension = extension;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExtensions(data: IExtension[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.extensions.push(data[i]);
      }
    }
  }
}
