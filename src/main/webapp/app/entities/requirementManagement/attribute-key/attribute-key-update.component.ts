import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAttributeKey, AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';

@Component({
  selector: 'jhi-attribute-key-update',
  templateUrl: './attribute-key-update.component.html'
})
export class AttributeKeyUpdateComponent implements OnInit {
  isSaving: boolean;

  requirementsets: IRequirementSet[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    type: [null, [Validators.required]],
    showOrder: [],
    active: [null, [Validators.required]],
    requirementSet: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected attributeKeyService: AttributeKeyService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attributeKey }) => {
      this.updateForm(attributeKey);
    });
    this.requirementSetService
      .query()
      .subscribe(
        (res: HttpResponse<IRequirementSet[]>) => (this.requirementsets = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(attributeKey: IAttributeKey) {
    this.editForm.patchValue({
      id: attributeKey.id,
      name: attributeKey.name,
      description: attributeKey.description,
      type: attributeKey.type,
      showOrder: attributeKey.showOrder,
      active: attributeKey.active,
      requirementSet: attributeKey.requirementSet
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
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
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
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const attributeKey = this.createFromForm();
    if (attributeKey.id !== undefined) {
      this.subscribeToSaveResponse(this.attributeKeyService.update(attributeKey));
    } else {
      this.subscribeToSaveResponse(this.attributeKeyService.create(attributeKey));
    }
  }

  private createFromForm(): IAttributeKey {
    return {
      ...new AttributeKey(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      type: this.editForm.get(['type']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value,
      requirementSet: this.editForm.get(['requirementSet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttributeKey>>) {
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
