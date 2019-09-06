import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from './requirement-set.service';

@Component({
  selector: 'jhi-requirement-set-delete-dialog',
  templateUrl: './requirement-set-delete-dialog.component.html'
})
export class RequirementSetDeleteDialogComponent {
  requirementSet: IRequirementSet;

  constructor(
    protected requirementSetService: RequirementSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.requirementSetService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'requirementSetListModification',
        content: 'Deleted an requirementSet'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-requirement-set-delete-popup',
  template: ''
})
export class RequirementSetDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ requirementSet }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RequirementSetDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.requirementSet = requirementSet;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/requirement-set', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/requirement-set', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
