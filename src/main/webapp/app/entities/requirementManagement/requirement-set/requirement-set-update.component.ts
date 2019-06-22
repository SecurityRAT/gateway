import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IRequirementSet, RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from './requirement-set.service';

@Component({
  selector: 'jhi-requirement-set-update',
  templateUrl: './requirement-set-update.component.html'
})
export class RequirementSetUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    showOrder: [],
    active: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ requirementSet }) => {
      this.updateForm(requirementSet);
    });
  }

  updateForm(requirementSet: IRequirementSet) {
    this.editForm.patchValue({
      id: requirementSet.id,
      name: requirementSet.name,
      description: requirementSet.description,
      showOrder: requirementSet.showOrder,
      active: requirementSet.active
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
    const requirementSet = this.createFromForm();
    if (requirementSet.id !== undefined) {
      this.subscribeToSaveResponse(this.requirementSetService.update(requirementSet));
    } else {
      this.subscribeToSaveResponse(this.requirementSetService.create(requirementSet));
    }
  }

  private createFromForm(): IRequirementSet {
    return {
      ...new RequirementSet(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequirementSet>>) {
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
}
