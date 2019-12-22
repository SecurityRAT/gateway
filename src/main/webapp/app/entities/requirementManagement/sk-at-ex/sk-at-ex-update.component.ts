import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISkAtEx, SkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { SkAtExService } from './sk-at-ex.service';
import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { SkeletonService } from 'app/entities/requirementManagement/skeleton/skeleton.service';
import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';
import { AttributeService } from 'app/entities/requirementManagement/attribute/attribute.service';
import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { ExtensionService } from 'app/entities/requirementManagement/extension/extension.service';

type SelectableEntity = ISkeleton | IAttribute | IExtension;

@Component({
  selector: 'jhi-sk-at-ex-update',
  templateUrl: './sk-at-ex-update.component.html'
})
export class SkAtExUpdateComponent implements OnInit {
  isSaving = false;

  skeletons: ISkeleton[] = [];

  attributes: IAttribute[] = [];

  extensions: IExtension[] = [];

  editForm = this.fb.group({
    id: [],
    skeleton: [],
    attribute: [],
    extension: []
  });

  constructor(
    protected skAtExService: SkAtExService,
    protected skeletonService: SkeletonService,
    protected attributeService: AttributeService,
    protected extensionService: ExtensionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skAtEx }) => {
      this.updateForm(skAtEx);

      this.skeletonService
        .query()
        .pipe(
          map((res: HttpResponse<ISkeleton[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ISkeleton[]) => (this.skeletons = resBody));

      this.attributeService
        .query()
        .pipe(
          map((res: HttpResponse<IAttribute[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAttribute[]) => (this.attributes = resBody));

      this.extensionService
        .query()
        .pipe(
          map((res: HttpResponse<IExtension[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IExtension[]) => (this.extensions = resBody));
    });
  }

  updateForm(skAtEx: ISkAtEx): void {
    this.editForm.patchValue({
      id: skAtEx.id,
      skeleton: skAtEx.skeleton,
      attribute: skAtEx.attribute,
      extension: skAtEx.extension
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      skeleton: this.editForm.get(['skeleton'])!.value,
      attribute: this.editForm.get(['attribute'])!.value,
      extension: this.editForm.get(['extension'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkAtEx>>): void {
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
