import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IExtensionKey, ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';

@Component({
  selector: 'jhi-extension-key-update',
  templateUrl: './extension-key-update.component.html'
})
export class ExtensionKeyUpdateComponent implements OnInit {
  isSaving: boolean;

  requirementsets: IRequirementSet[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    section: [null, [Validators.required]],
    type: [],
    showOrder: [],
    active: [null, [Validators.required]],
    requirementSet: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected extensionKeyService: ExtensionKeyService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ extensionKey }) => {
      this.updateForm(extensionKey);
    });
    this.requirementSetService
      .query()
      .subscribe(
        (res: HttpResponse<IRequirementSet[]>) => (this.requirementsets = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(extensionKey: IExtensionKey) {
    this.editForm.patchValue({
      id: extensionKey.id,
      name: extensionKey.name,
      description: extensionKey.description,
      section: extensionKey.section,
      type: extensionKey.type,
      showOrder: extensionKey.showOrder,
      active: extensionKey.active,
      requirementSet: extensionKey.requirementSet
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
    const extensionKey = this.createFromForm();
    if (extensionKey.id !== undefined) {
      this.subscribeToSaveResponse(this.extensionKeyService.update(extensionKey));
    } else {
      this.subscribeToSaveResponse(this.extensionKeyService.create(extensionKey));
    }
  }

  private createFromForm(): IExtensionKey {
    return {
      ...new ExtensionKey(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      section: this.editForm.get(['section']).value,
      type: this.editForm.get(['type']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value,
      requirementSet: this.editForm.get(['requirementSet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtensionKey>>) {
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
