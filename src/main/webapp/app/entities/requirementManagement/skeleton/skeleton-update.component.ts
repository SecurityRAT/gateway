import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISkeleton, Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from './skeleton.service';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set';

@Component({
  selector: 'jhi-skeleton-update',
  templateUrl: './skeleton-update.component.html'
})
export class SkeletonUpdateComponent implements OnInit {
  isSaving: boolean;

  requirementsets: IRequirementSet[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    showOrder: [],
    active: [null, [Validators.required]],
    requirementSet: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected skeletonService: SkeletonService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ skeleton }) => {
      this.updateForm(skeleton);
    });
    this.requirementSetService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRequirementSet[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRequirementSet[]>) => response.body)
      )
      .subscribe((res: IRequirementSet[]) => (this.requirementsets = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(skeleton: ISkeleton) {
    this.editForm.patchValue({
      id: skeleton.id,
      name: skeleton.name,
      description: skeleton.description,
      showOrder: skeleton.showOrder,
      active: skeleton.active,
      requirementSet: skeleton.requirementSet
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value,
      requirementSet: this.editForm.get(['requirementSet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkeleton>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRequirementSetById(index: number, item: IRequirementSet) {
    return item.id;
  }
}
