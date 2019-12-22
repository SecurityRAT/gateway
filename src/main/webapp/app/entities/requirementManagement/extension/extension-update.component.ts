import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IExtension, Extension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from './extension.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from 'app/entities/requirementManagement/extension-key/extension-key.service';

@Component({
  selector: 'jhi-extension-update',
  templateUrl: './extension-update.component.html'
})
export class ExtensionUpdateComponent implements OnInit {
  isSaving = false;

  extensionkeys: IExtensionKey[] = [];

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
    protected eventManager: JhiEventManager,
    protected extensionService: ExtensionService,
    protected extensionKeyService: ExtensionKeyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extension }) => {
      this.updateForm(extension);

      this.extensionKeyService
        .query()
        .pipe(
          map((res: HttpResponse<IExtensionKey[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IExtensionKey[]) => (this.extensionkeys = resBody));
    });
  }

  updateForm(extension: IExtension): void {
    this.editForm.patchValue({
      id: extension.id,
      content: extension.content,
      description: extension.description,
      showOrder: extension.showOrder,
      active: extension.active,
      extensionKey: extension.extensionKey
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
      id: this.editForm.get(['id'])!.value,
      content: this.editForm.get(['content'])!.value,
      description: this.editForm.get(['description'])!.value,
      showOrder: this.editForm.get(['showOrder'])!.value,
      active: this.editForm.get(['active'])!.value,
      extensionKey: this.editForm.get(['extensionKey'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtension>>): void {
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

  trackById(index: number, item: IExtensionKey): any {
    return item.id;
  }
}
