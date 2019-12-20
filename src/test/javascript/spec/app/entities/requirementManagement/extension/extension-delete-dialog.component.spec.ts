import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ExtensionDeleteDialogComponent } from 'app/entities/requirementManagement/extension/extension-delete-dialog.component';
import { ExtensionService } from 'app/entities/requirementManagement/extension/extension.service';

describe('Component Tests', () => {
  describe('Extension Management Delete Component', () => {
    let comp: ExtensionDeleteDialogComponent;
    let fixture: ComponentFixture<ExtensionDeleteDialogComponent>;
    let service: ExtensionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ExtensionDeleteDialogComponent]
      })
        .overrideTemplate(ExtensionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtensionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtensionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
