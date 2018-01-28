/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { SkAtExDetailComponent } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex-detail.component';
import { SkAtExService } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.service';
import { SkAtEx } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.model';

describe('Component Tests', () => {

    describe('SkAtEx Management Detail Component', () => {
        let comp: SkAtExDetailComponent;
        let fixture: ComponentFixture<SkAtExDetailComponent>;
        let service: SkAtExService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkAtExDetailComponent],
                providers: [
                    SkAtExService
                ]
            })
            .overrideTemplate(SkAtExDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkAtExDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkAtExService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SkAtEx(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.skAtEx).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
