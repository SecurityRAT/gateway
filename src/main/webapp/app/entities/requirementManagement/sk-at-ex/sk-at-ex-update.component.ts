import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISkAtEx, SkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';
import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from 'app/entities/requirementManagement/skeleton/skeleton.service';
import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';
import { AttributeService } from 'app/entities/requirementManagement/attribute/attribute.service';
import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from 'app/entities/requirementManagement/extension/extension.service';

@Component({
  selector: 'jhi-sk-at-ex-update',
  templateUrl: './sk-at-ex-update.component.html'
})
export class SkAtExUpdateComponent implements OnInit {
  isSaving: boolean;

  skeletons: ISkeleton[];

  attributes: IAttribute[];

  extensions: IExtension[];

  editForm = this.fb.group({
    id: [],
    skeleton: [],
    attribute: [],
    extension: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected skAtExService: SkAtExService,
    protected skeletonService: SkeletonService,
    protected attributeService: AttributeService,
    protected extensionService: ExtensionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ skAtEx }) => {
      this.updateForm(skAtEx);
    });
    this.skeletonService
      .query()
      .subscribe((res: HttpResponse<ISkeleton[]>) => (this.skeletons = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.attributeService
      .query()
      .subscribe((res: HttpResponse<IAttribute[]>) => (this.attributes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.extensionService
      .query()
      .subscribe((res: HttpResponse<IExtension[]>) => (this.extensions = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(skAtEx: ISkAtEx) {
    this.editForm.patchValue({
      id: skAtEx.id,
      skeleton: skAtEx.skeleton,
      attribute: skAtEx.attribute,
      extension: skAtEx.extension
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const skAtEx = this.createFromForm();
    if (skAtEx.id !== undefined) {
      this.subscribeToSaveResponse(this.skAtExService.update(skAtEx));
    } else {
      this.subscribeToSaveResponse(this.skAtExService.create(skAtEx));
    }
  }

  private createFromForm(): ISkAtEx {
    return {
      ...new SkAtEx(),
      id: this.editForm.get(['id']).value,
      skeleton: this.editForm.get(['skeleton']).value,
      attribute: this.editForm.get(['attribute']).value,
      extension: this.editForm.get(['extension']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkAtEx>>) {
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

  trackSkeletonById(index: number, item: ISkeleton) {
    return item.id;
  }

  trackAttributeById(index: number, item: IAttribute) {
    return item.id;
  }

  trackExtensionById(index: number, item: IExtension) {
    return item.id;
  }
}
