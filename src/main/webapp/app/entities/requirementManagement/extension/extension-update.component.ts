import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IExtension, Extension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from 'app/entities/requirementManagement/extension-key/extension-key.service';

@Component({
  selector: 'jhi-extension-update',
  templateUrl: './extension-update.component.html'
})
export class ExtensionUpdateComponent implements OnInit {
  isSaving: boolean;

  extensionkeys: IExtensionKey[];

  editForm = this.fb.group({
    id: [],
    content: [null, [Validators.required]],
    description: [],
    showOrder: [],
    active: [null, [Validators.required]],
    extensionKey: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected extensionService: ExtensionService,
    protected extensionKeyService: ExtensionKeyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ extension }) => {
      this.updateForm(extension);
    });
    this.extensionKeyService
      .query()
      .subscribe(
        (res: HttpResponse<IExtensionKey[]>) => (this.extensionkeys = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(extension: IExtension) {
    this.editForm.patchValue({
      id: extension.id,
      content: extension.content,
      description: extension.description,
      showOrder: extension.showOrder,
      active: extension.active,
      extensionKey: extension.extensionKey
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
    const extension = this.createFromForm();
    if (extension.id !== undefined) {
      this.subscribeToSaveResponse(this.extensionService.update(extension));
    } else {
      this.subscribeToSaveResponse(this.extensionService.create(extension));
    }
  }

  private createFromForm(): IExtension {
    return {
      ...new Extension(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      description: this.editForm.get(['description']).value,
      showOrder: this.editForm.get(['showOrder']).value,
      active: this.editForm.get(['active']).value,
      extensionKey: this.editForm.get(['extensionKey']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtension>>) {
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

  trackExtensionKeyById(index: number, item: IExtensionKey) {
    return item.id;
  }
}
