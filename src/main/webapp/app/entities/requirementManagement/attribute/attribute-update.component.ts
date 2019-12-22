import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAttribute, Attribute } from 'app/shared/model/requirementManagement/attribute.model';
import { AttributeService } from './attribute.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { AttributeKeyService } from 'app/entities/requirementManagement/attribute-key/attribute-key.service';

type SelectableEntity = IAttribute | IAttributeKey;

@Component({
  selector: 'jhi-attribute-update',
  templateUrl: './attribute-update.component.html'
})
export class AttributeUpdateComponent implements OnInit {
  isSaving = false;

  attributes: IAttribute[] = [];

  attributekeys: IAttributeKey[] = [];

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
    protected eventManager: JhiEventManager,
    protected attributeService: AttributeService,
    protected attributeKeyService: AttributeKeyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attribute }) => {
      this.updateForm(attribute);

      this.attributeService
        .query()
        .pipe(
          map((res: HttpResponse<IAttribute[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAttribute[]) => (this.attributes = resBody));

      this.attributeKeyService
        .query()
        .pipe(
          map((res: HttpResponse<IAttributeKey[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAttributeKey[]) => (this.attributekeys = resBody));
    });
  }

  updateForm(attribute: IAttribute): void {
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

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      showOrder: this.editForm.get(['showOrder'])!.value,
      active: this.editForm.get(['active'])!.value,
      parent: this.editForm.get(['parent'])!.value,
      attributeKey: this.editForm.get(['attributeKey'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttribute>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
