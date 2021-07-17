import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IExtensionKey, ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionKeyService } from './extension-key.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';

@Component({
  selector: 'jhi-extension-key-update',
  templateUrl: './extension-key-update.component.html',
})
export class ExtensionKeyUpdateComponent implements OnInit {
  isSaving = false;
  requirementsets: IRequirementSet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    section: [null, [Validators.required]],
    type: [],
    showOrder: [],
    active: [null, [Validators.required]],
    requirementSet: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected extensionKeyService: ExtensionKeyService,
    protected requirementSetService: RequirementSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extensionKey }) => {
      this.updateForm(extensionKey);

      this.requirementSetService.query().subscribe((res: HttpResponse<IRequirementSet[]>) => (this.requirementsets = res.body || []));
    });
  }

  updateForm(extensionKey: IExtensionKey): void {
    this.editForm.patchValue({
      id: extensionKey.id,
      name: extensionKey.name,
      description: extensionKey.description,
      section: extensionKey.section,
      type: extensionKey.type,
      showOrder: extensionKey.showOrder,
      active: extensionKey.active,
      requirementSet: extensionKey.requirementSet,
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      section: this.editForm.get(['section'])!.value,
      type: this.editForm.get(['type'])!.value,
      showOrder: this.editForm.get(['showOrder'])!.value,
      active: this.editForm.get(['active'])!.value,
      requirementSet: this.editForm.get(['requirementSet'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtensionKey>>): void {
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
