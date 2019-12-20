import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ExtensionKeyUpdateComponent } from 'app/entities/requirementManagement/extension-key/extension-key-update.component';
import { ExtensionKeyService } from 'app/entities/requirementManagement/extension-key/extension-key.service';
import { ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

describe('Component Tests', () => {
  describe('ExtensionKey Management Update Component', () => {
    let comp: ExtensionKeyUpdateComponent;
    let fixture: ComponentFixture<ExtensionKeyUpdateComponent>;
    let service: ExtensionKeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ExtensionKeyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExtensionKeyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExtensionKeyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtensionKeyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExtensionKey(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExtensionKey();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
