import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISkeleton, Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';

@Component({
  selector: 'jhi-skeleton-update',
  templateUrl: './skeleton-update.component.html',
})
export class SkeletonUpdateComponent implements OnInit {
  isSaving = false;
  requirementsets: IRequirementSet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    showOrder: [],
    active: [null, [Validators.required]],
    requirementSet: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected skeletonService: SkeletonService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skeleton }) => {
      this.updateForm(skeleton);

      this.requirementSetService.query().subscribe((res: HttpResponse<IRequirementSet[]>) => (this.requirementsets = res.body || []));
    });
  }

  updateForm(skeleton: ISkeleton): void {
    this.editForm.patchValue({
      id: skeleton.id,
      name: skeleton.name,
      description: skeleton.description,
      showOrder: skeleton.showOrder,
      active: skeleton.active,
      requirementSet: skeleton.requirementSet,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skeleton = this.createFromForm();
    if (skeleton.id !== undefined) {
      this.subscribeToSaveResponse(this.skeletonService.update(skeleton));
    } else {
      this.subscribeToSaveResponse(this.skeletonService.create(skeleton));
    }
  }

  private createFromForm(): ISkeleton {
    return {
      ...new Skeleton(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      showOrder: this.editForm.get(['showOrder'])!.value,
      active: this.editForm.get(['active'])!.value,
      requirementSet: this.editForm.get(['requirementSet'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkeleton>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRequirementSet): any {
    return item.id;
  }
}
