import { Component, OnInit, Optional } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { NgbTabChangeEvent, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faArrowRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { MOCK_DATA } from '../../../app.constants';
import {
  CaseManagementBackendService,
  CMUtilService,
  CMRequirementSet,
  CMAttributeKey,
  CMAttribute,
  CMAttributeType,
  ATTRIBUTEKEYS_URI,
  ATTRIBUTES_URI,
  REQUIREMENTSETS_URI,
  ARTIFACTNAME_PARAM,
  REQUIREMENTSET_URI,
  REQUIREMENTSET_PARAM,
  ATTRIBUTE_PARAM
} from '../../common';
import { Router, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'jhi-start-up',
  templateUrl: 'start-up.component.html',
  styleUrls: ['./start-up.component.scss']
})
export class StartUpComponent implements OnInit {
  artifactSettings: any;
  selectedRequirementSet: CMRequirementSet;
  changeSelectionProperties: any;
  backUpSelectedRequirementSetId: number; // In case the tab is switch back and forth but the requirement set is not changed.
  requirementSets: CMRequirementSet[];
  attributeKeys: CMAttributeKey[];
  attributes: CMAttribute[];
  tabs: any[];
  initialActiveTab: string;
  faArrowRight = faArrowRight;
  faQuestionCircle = faQuestionCircle;

  constructor(
    private caseManagementBackendService: CaseManagementBackendService,
    private jhiAlertService: JhiAlertService,
    private util: CMUtilService,
    private router: Router,
    @Optional() private activeModal: NgbActiveModal
  ) {
    this.changeSelectionProperties = {};
    this.artifactSettings = {};
    this.selectedRequirementSet = null;
    this.requirementSets = [];
    this.attributeKeys = [];
    this.attributes = [];
    this.tabs = [
      {
        title: 'Select a requirement set',
        id: 'step1',
        disabled: false
      },
      {
        title: 'Artifact settings',
        id: 'step2',
        disabled: false
      }
    ];
  }

  ngOnInit(): void {
    if (this.changeSelectionProperties.active) {
      this.tabs[0].disabled = true;
      this.setInitialActiveTab(1);
      this.reset();
    } else {
      // Loads the requirements sets
      this.caseManagementBackendService.query(CMRequirementSet, REQUIREMENTSETS_URI).subscribe(
        (res: HttpResponse<CMRequirementSet[]>) => {
          this.onSuccess(res.body, this.requirementSets);
          // TODO Implement change settings. The selected Ids should be available in the queryParms variable.
          // TODO Implement reaction to cases where the Ids from the queryParams do not exist in the received values from the server.
          if (res.body.length === 1) {
            this.selectedRequirementSet = res.body[0];
            this.reset();
            this.setInitialActiveTab(1); // the initial tab to the second one.
          }
        },
        (res: HttpErrorResponse) => this.onError(res)
      );
    }
  }

  // registerEvent() {
  //     this.artifactSettingsEvent = this.jhiEventManager.subscribe('artifactSettingModification', () => { });
  // }

  loadAll(): void {
    if (MOCK_DATA) {
      /* Mock load ATTRIBUTE and ATTRIBUTE KEYS */
      this.caseManagementBackendService
        .findAttributeKeys(this.selectedRequirementSet.id, CMAttributeType.PARAMETER)
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.attributeKeys);
        });
      this.caseManagementBackendService
        .findAttributes(this.selectedRequirementSet.id, CMAttributeType.PARAMETER)
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.attributes);
          console.log(this.attributes);
          console.log(this.changeSelectionProperties);
          if (this.changeSelectionProperties.selectedAttributes !== undefined && this.attributes) {
            this.util.updatePropertyInArray(this.attributes, { selected: true }, this.changeSelectionProperties.selectedAttributes);
          }
        });
    } else {
      /* Backend load ATTRIBUTE and ATTRIBUTE KEYS */
      this.caseManagementBackendService
        .query(CMAttributeKey, ATTRIBUTEKEYS_URI, { requirementSet: this.selectedRequirementSet.id, type: CMAttributeType.PARAMETER })
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.attributeKeys);
        });
      this.caseManagementBackendService
        .query(CMAttribute, ATTRIBUTES_URI, { requirementSet: this.selectedRequirementSet.id, type: CMAttributeType.PARAMETER })
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.attributes);
          console.log(this.changeSelectionProperties);
          if (this.attributes) {
            //this.changeSelectionProperties.selectedAttributes !== undefined &&
            this.util.updatePropertyInArray(this.attributes, { selected: true }, this.changeSelectionProperties.selectedAttributes);
            console.log(this.attributes);
            this.attributes = [...this.attributes];
          }
        });
    }
  }
  /**
   * Bounds to the ngTab 'tabchange' event.
   * @param $event event object
   */
  beforeChange($event: NgbTabChangeEvent): void {
    switch ($event.nextId) {
      case this.tabs[1].id:
        // resets the attributes when the selected requirement set changes
        if (this.selectedRequirementSet && this.selectedRequirementSet.id !== this.backUpSelectedRequirementSetId) {
          this.reset();
        }
        break;
      default:
        this.backUpSelectedRequirementSetId = this.selectedRequirementSet.id;
        break;
    }
  }

  generate(): void {
    const selectedAttributes: CMAttribute[] = this.util.filterByObj(this.attributes, { selected: true });

    this.router.navigate([
      '/requirements',
      {
        requirementSet: this.selectedRequirementSet.id,
        attributes: selectedAttributes.map(item => item.id),
        attributeKeys: selectedAttributes
          .map(item => item.keyId)
          .filter((elem, index, self) => {
            return index === self.indexOf(elem);
          }),
        name: this.artifactSettings.name
      }
    ]);
    this.close();
  }

  clear(): void {
    if (this.activeModal) {
      this.activeModal.dismiss('cancel');
    }
  }

  close(): void {
    if (this.activeModal) {
      this.activeModal.close('close');
    }
  }

  private reset(): void {
    this.attributeKeys = [];
    this.attributes = [];
    this.loadAll();
  }

  /**
   * Sets the initial Active tab.
   */
  private setInitialActiveTab(tabIndex: number): void {
    this.initialActiveTab = this.tabs[tabIndex].id;
  }

  private onSuccess<T>(res: T[], target: T[]): void {
    const sortedResponse = this.util.sortArrayByPredicate(res, 'showOrder');
    for (let i = 0; i < sortedResponse.length; i++) {
      target.push(sortedResponse[i]);
    }
  }

  private onError(error: any): void {
    this.jhiAlertService.error(error.message, null, null);
  }
}

@Component({
  selector: 'jhi-change-selection',
  template: ``
})
export class ChangeSelectionComponent implements OnInit {
  ngbModalRef: NgbModalRef;
  constructor(
    private _modalService: NgbModal,
    private _router: Router,
    private _cmBackendService: CaseManagementBackendService,
    private _cmUtilService: CMUtilService
  ) {
    this.ngbModalRef = null;
  }

  ngOnInit(): void {
    this.open(StartUpComponent as Component);
  }

  open(component: Component): Promise<NgbModalRef> {
    // eslint-disable-next-line
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }

      // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        const parameters = this._router.parseUrl(this._router.url).root.children[PRIMARY_OUTLET].segments[0].parameters;
        /* Exception can be thrown due not non parseble string -> number */
        const requirementSetId = this._cmUtilService.convertStringToNumberArray(parameters[REQUIREMENTSET_PARAM], true)[0];
        this.ngbModalRef = this._modalService.open(component, {
          size: 'lg'
        });

        if (MOCK_DATA) {
          /* Mock load */
          this.ngbModalRef.componentInstance.selectedRequirementSet = new CMRequirementSet(requirementSetId, 'Test requirement set', 10);

          this.ngbModalRef.componentInstance.artifactSettings.name = parameters[ARTIFACTNAME_PARAM];

          this.ngbModalRef.componentInstance.changeSelectionProperties.active = true;
          this.ngbModalRef.componentInstance.changeSelectionProperties.selectedAttributes =
            parameters[ATTRIBUTE_PARAM].length > 0 ? this._cmUtilService.convertStringToNumberArray(parameters[ATTRIBUTE_PARAM], true) : [];
        } else {
          this._cmBackendService
            .query(CMRequirementSet, REQUIREMENTSET_URI, { ids: [requirementSetId] })
            .subscribe((res: HttpResponse<CMRequirementSet[]>) => {
              /* Backend load */
              this.ngbModalRef.componentInstance.selectedRequirementSet = res.body[0];

              this.ngbModalRef.componentInstance.artifactSettings.name = parameters[ARTIFACTNAME_PARAM];

              this.ngbModalRef.componentInstance.changeSelectionProperties.active = true;
              this.ngbModalRef.componentInstance.changeSelectionProperties.selectedAttributes =
                parameters[ATTRIBUTE_PARAM].length > 0
                  ? this._cmUtilService.convertStringToNumberArray(parameters[ATTRIBUTE_PARAM], true)
                  : [];
            });
        }
        this.ngbModalRef.result.then(
          // eslint-disable-next-line
          result => {
            this.ngbModalRef = null;
          },
          // eslint-disable-next-line
          reason => {
            this._router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
        resolve(this.ngbModalRef);
      }, 0);
    });
  }
}
