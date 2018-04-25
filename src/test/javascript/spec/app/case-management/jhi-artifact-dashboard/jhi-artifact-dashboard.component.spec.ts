import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JhiArtifactDashboardComponent } from '../../../../../../main/webapp/app/case-management/requirement-editor/jhi-artifact-dashboard/jhi-artifact-dashboard.component';

describe('Component Tests', () => {

  describe('Artifact Component', () => {
    let component: JhiArtifactDashboardComponent;
    let fixture: ComponentFixture<JhiArtifactDashboardComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [JhiArtifactDashboardComponent]
      })
        .overrideTemplate(JhiArtifactDashboardComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(JhiArtifactDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
