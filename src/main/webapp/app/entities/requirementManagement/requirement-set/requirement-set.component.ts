import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RequirementSetService } from './requirement-set.service';
import { RequirementSetDeleteDialogComponent } from './requirement-set-delete-dialog.component';

@Component({
  selector: 'jhi-requirement-set',
  templateUrl: './requirement-set.component.html',
})
export class RequirementSetComponent implements OnInit, OnDestroy {
  requirementSets: IRequirementSet[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected requirementSetService: RequirementSetService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.requirementSets = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.requirementSetService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IRequirementSet[]>) => this.paginateRequirementSets(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.requirementSets = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRequirementSets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRequirementSet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInRequirementSets(): void {
    this.eventSubscriber = this.eventManager.subscribe('requirementSetListModification', () => this.reset());
  }

  delete(requirementSet: IRequirementSet): void {
    const modalRef = this.modalService.open(RequirementSetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.requirementSet = requirementSet;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRequirementSets(data: IRequirementSet[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.requirementSets.push(data[i]);
      }
    }
  }
}
