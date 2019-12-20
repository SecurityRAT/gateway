import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAttribute, Attribute } from 'app/shared/model/requirementManagement/attribute.model';
import { AttributeService } from './attribute.service';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from 'app/entities/requirementManagement/attribute-key/attribute-key.service';

@Component({
  selector: 'jhi-attribute-update',
  templateUrl: './attribute-update.component.html'
})
export class AttributeUpdateComponent implements OnInit {
  isSaving: boolean;

  attributes: IAttribute[];

  attributekeys: IAttributeKey[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    showOrder: [],
    active: [null, [Validators.required]],
    parent: [],
    attributeKey: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected attributeService: AttributeService,
    protected attributeKeyService: AttributeKeyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attribute }) => {
      this.updateForm(attribute);
    });
    this.attributeService
      .query()
      .subscribe((res: HttpResponse<IAttribute[]>) => (this.attributes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.attributeKeyService
      .query()
      .subscribe(
        (res: HttpResponse<IAttributeKey[]>) => (this.attributekeys = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(attribute: IAttribute) {
    this.editForm.patchValue({
      id: attribute.id,
      name: attribute.name,
      description: attribute.description,
      showOrder: attribute.showOrder,
      active: attribute.active,
      parent: attribute.parent,
      attributeKey: attribute.attributeKey
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
    const attribute = this.createFromForm();
    if (attribute.id !== undefined) {
      this.subscribeToSaveResponse(this.attributeService.update(attribute));
    } else {
      this.subscribeToSaveResponse(this.attributeService.create(attribute));
    }
  }

  private createFromForm(): IAttribute {
    return {
      ...new Attribute(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value,
      parent: this.editForm.get(['parent']).value,
      attributeKey: this.editForm.get(['attributeKey']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttribute>>) {
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

  trackAttributeById(index: number, item: IAttribute) {
    return item.id;
  }

  trackAttributeKeyById(index: number, item: IAttributeKey) {
    return item.id;
  }
}
