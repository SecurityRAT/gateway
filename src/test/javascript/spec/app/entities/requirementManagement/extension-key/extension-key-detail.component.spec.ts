/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ExtensionKeyDetailComponent } from 'app/entities/requirementManagement/extension-key/extension-key-detail.component';
import { ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

describe('Component Tests', () => {
  describe('ExtensionKey Management Detail Component', () => {
    let comp: ExtensionKeyDetailComponent;
    let fixture: ComponentFixture<ExtensionKeyDetailComponent>;
    const route = ({ data: of({ extensionKey: new ExtensionKey(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ExtensionKeyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtensionKeyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtensionKeyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extensionKey).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
