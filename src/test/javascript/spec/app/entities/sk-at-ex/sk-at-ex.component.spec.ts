/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SkAtExComponent } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.component';
import { SkAtExService } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.service';
import { SkAtEx } from '../../../../../../main/webapp/app/entities/sk-at-ex/sk-at-ex.model';

describe('Component Tests', () => {

    describe('SkAtEx Management Component', () => {
        let comp: SkAtExComponent;
        let fixture: ComponentFixture<SkAtExComponent>;
        let service: SkAtExService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkAtExComponent],
                providers: [
                    SkAtExService
                ]
            })
            .overrideTemplate(SkAtExComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkAtExComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkAtExService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SkAtEx(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skAtExes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
