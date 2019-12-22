import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CaseManagementBackendService,
  CMUtilService,
  // matrix param constants
  ARTIFACTNAME_PARAM,
  REQUIREMENTSET_PARAM,
  ATTRIBUTE_PARAM,
  ATTRIBUTEKEYS_PARAM,
  CMAttributeKey,
  CMAttribute,
  CMAttributeType,
  CMRequirementSet,
  CMExtensionKey,
  CMRequirement,
  CMExtension,
  CMStatusSubType,
  CMExtensionType,
  ATTRIBUTES_URI,
  ATTRIBUTEKEYS_URI,
  ENHANCEMENTS_URI,
  STATUS_URI,
  REQUIREMENTS_URI,
  ATTRIBUTE_URI,
  REQUIREMENTSET_URI,
  ATTRIBUTEKEY_URI
} from '../../common/';
import { ArtifactInfo } from '../../common/models/yaml.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { MOCK_DATA } from '../../../app.constants';
import { RequirementEditorDataShareService } from '../requirement-editor-data-share.service';
// import { JhiEventManager } from 'ng-jhipster';

type CategoryObject = {
  categories: CMAttribute[];
  formattedCategories: CMAttribute[];
  categoryIdsInList: number[];
};

type TagObject = {
  tags: CMAttribute[];
  tagKeys: CMAttributeKey[];
};

type ArtifactSettings = {
  artifactInfo?: ArtifactInfo;
  generatedOn?: Date;
  lastSaved?: Date;
  parameterAttributes?: {
    ids: number[];
    content: CMAttribute[];
  };
  parameterAttributeKeys?: {
    ids: number[];
    content: CMAttributeKey[];
  };
  requirementSet?: {
    id: number;
    content: CMRequirementSet;
  };
};
@Component({
  selector: 'jhi-editor',
  templateUrl: 'editor.component.html'
})
export class EditorComponent implements OnInit, OnDestroy {
  routeSub: any;
  artifactSettings: ArtifactSettings;
  enhancements: CMExtensionKey[];
  status: CMExtensionKey[];
  tags: CMAttribute[];
  requirements: CMRequirement[];
  totalRequests: number;
  categoryObject: CategoryObject;
  tagObject: TagObject;
  customMode = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cmUtilService: CMUtilService,
    private _backendService: CaseManagementBackendService,
    private _router: Router,
    private _jhiAlert: JhiAlertService,
    private _requirementEditorDataShare: RequirementEditorDataShareService
  ) {
    this.artifactSettings = {};
    this.categoryObject = {
      formattedCategories: [],
      categoryIdsInList: [],
      categories: []
    };
    this.tagObject = {
      tags: [],
      tagKeys: []
    };
    this.enhancements = [];
    this.status = [];
    this.tags = [];
    this.requirements = [];
    this.totalRequests = 8; // this will help to the progressbar.
  }

  changeMode(cm: boolean): void {
    this.customMode = cm;
  }

  ngOnInit(): void {
    // extracts artifact settings from matrix params
    this.routeSub = this._activatedRoute.paramMap.subscribe(values => {
      this.totalRequests = 8;
      /* This implies either 'generate requirements' or 'selection change' */
      if (
        values.has(ARTIFACTNAME_PARAM) &&
        values.has(REQUIREMENTSET_PARAM) &&
        values.has(ATTRIBUTE_PARAM) &&
        values.has(ATTRIBUTEKEYS_PARAM)
      ) {
        let stayUnChanged = false;
        if (this.artifactSettings.requirementSet === undefined) {
          this.artifactSettings.requirementSet = {
            /* a requirement set muss be selected */
            id: +values.get(REQUIREMENTSET_PARAM),
            /* change to null when removing mock data */
            content: null
          };
        } else {
          /* Prevents requirementSet from being changed in the URL */
          if (this.artifactSettings.requirementSet.id.toString() !== values.get(REQUIREMENTSET_PARAM)) {
            stayUnChanged = true;
            this._jhiAlert.error('You cannot change the requirement set from the URL. Please define a new artifact.');
          }
        }
        if (!stayUnChanged) {
          Object.assign(this.artifactSettings, {
            /* artifact name cannot be empty */
            artifactInfo: new ArtifactInfo(values.get(ARTIFACTNAME_PARAM)),
            parameterAttributes: {
              ids:
                values.get(ATTRIBUTE_PARAM).length > 0
                  ? this._cmUtilService.convertStringToNumberArray(values.get(ATTRIBUTE_PARAM), true)
                  : [],
              content: []
            },
            parameterAttributeKeys: {
              ids:
                values.get(ATTRIBUTEKEYS_PARAM).length > 0
                  ? this._cmUtilService.convertStringToNumberArray(values.get(ATTRIBUTEKEYS_PARAM), true)
                  : [],
              content: []
            },
            generatedOn: new Date()
          });
          this.loadParameters();
          if (this.requirements.length === 0) {
            this.loadFilters();
            this.loadExtensions();
            this.loadRequirements();
          } else {
            this._router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            /* This block is executed on change selection */
            const copyReqs = Object.assign([], this.requirements);
            this.requirements = [];
            this.totalRequests -= 5; // this will help to the progressbar.
            this.loadRequirements(copyReqs);
          }
        }
      }
    });
  }

  loadFilters(): void {
    if (MOCK_DATA) {
      /* Mock load FE_TAGS */
      this._backendService.getMockTagKeys().subscribe((res: HttpResponse<CMAttributeKey[]>) => {
        this.onSuccess(res.body, this.tagObject.tagKeys);
      });
      this._backendService.getMockTags().subscribe((res: HttpResponse<CMAttribute[]>) => {
        this.onSuccess(res.body, this.tagObject.tags);
      });
      /* Mock load Categories */
      this._backendService.getMockCategories().subscribe((res: HttpResponse<CMAttribute[]>) => {
        this.onSuccess(res.body, this.categoryObject.categories);
        this.categoryObject.formattedCategories = this._cmUtilService.formatCategoryListForView(this.categoryObject.categories, '', '>');
      });
    } else {
      /* Load FE_TAGS */
      this._backendService
        .query(CMAttribute, ATTRIBUTES_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.FETAG })
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.tagObject.tags);
        });
      this._backendService
        .query(CMAttributeKey, ATTRIBUTEKEYS_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.FETAG })
        .subscribe((res: HttpResponse<CMAttributeKey[]>) => {
          this.onSuccess(res.body, this.tagObject.tagKeys);
        });
      /* Backend load Categories */
      this._backendService
        .query(CMAttribute, ATTRIBUTES_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.CATEGORY })
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.categoryObject.categories);
          this._cmUtilService.formatCategoryListForView(this.categoryObject.categories, '', '>');
        });
    }
    this._requirementEditorDataShare.setCategories(this.categoryObject.formattedCategories);
  }

  loadExtensions(): void {
    if (MOCK_DATA) {
      /* Mock load ENHANCEMENT and STATUS */
      this._backendService.findEnhancements(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
        this.onSuccess(res.body, this.enhancements);
      });
      this._backendService.findStatus(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
        this.onSuccess(res.body, this.status);
        this.updateStatusInReqs();
      });
    } else {
      /* Backend load ENHANCEMENT and STATUS */
      this._backendService
        .query(CMExtensionKey, ENHANCEMENTS_URI, { requirementSet: this.artifactSettings.requirementSet.id })
        .subscribe((res: HttpResponse<CMExtensionKey[]>) => {
          this.onSuccess(res.body, this.enhancements);
        });
      this._backendService
        .query(CMExtensionKey, STATUS_URI, { requirementSet: this.artifactSettings.requirementSet.id })
        .subscribe((res: HttpResponse<CMExtensionKey[]>) => {
          this.onSuccess(res.body, this.status);
          this.updateStatusInReqs();
        });
    }
    this._requirementEditorDataShare.setStatus(this.status);
    this._requirementEditorDataShare.setEnhancements(this.enhancements);
  }

  loadParameters(): void {
    // implement error handlers
    if (MOCK_DATA) {
      this._backendService
        .getAttributeKeys(this.artifactSettings.parameterAttributeKeys.ids)
        .subscribe((res: HttpResponse<CMAttributeKey[]>) => {
          this.onSuccess(res.body, this.artifactSettings.parameterAttributeKeys.content);
          const filter: CMAttributeKey[] = [];
          this.artifactSettings.parameterAttributeKeys.ids.forEach(id => {
            filter.push(...this._cmUtilService.filterByObj(this.artifactSettings.parameterAttributeKeys.content, { id }));
          });
          this.artifactSettings.parameterAttributeKeys.content = filter;
        });
      /* Mock load Attribute with ids */
      this._backendService.getAttributes(this.artifactSettings.parameterAttributes.ids).subscribe((res: HttpResponse<CMAttribute[]>) => {
        this.onSuccess(res.body, this.artifactSettings.parameterAttributes.content);
      });

      this.artifactSettings.requirementSet.content = new CMRequirementSet(1, 'Test requirement set', 10);
    } else {
      /* Backend load Attribute with ids */
      this._backendService
        .query(CMAttribute, ATTRIBUTE_URI, { ids: this.artifactSettings.parameterAttributes.ids })
        .subscribe((res: HttpResponse<CMAttribute[]>) => {
          this.onSuccess(res.body, this.artifactSettings.parameterAttributes.content);
        });

      /* Backend load Attribute keys and requirement sets */
      this._backendService
        .query(CMAttributeKey, ATTRIBUTEKEY_URI, { ids: this.artifactSettings.parameterAttributeKeys.ids })
        .subscribe((res: HttpResponse<CMAttributeKey[]>) => {
          this.onSuccess(res.body, this.artifactSettings.parameterAttributeKeys.content);
        });
      this._backendService
        .query(CMRequirementSet, REQUIREMENTSET_URI, { ids: this.artifactSettings.requirementSet.id })
        .subscribe((res: HttpResponse<CMRequirementSet[]>) => {
          this.artifactSettings.requirementSet.content = res.body[0];
        });
    }
    this._requirementEditorDataShare.setAttributes(this.artifactSettings.parameterAttributes.content);
  }

  private loadRequirements(oldRequirements?: CMRequirement[]): void {
    if (MOCK_DATA) {
      /* Mock load REQUIREMENTS */
      this._backendService
        .fetchRequirements(this.artifactSettings.requirementSet.id, this.artifactSettings.parameterAttributes.ids)
        .subscribe((res: HttpResponse<CMRequirement[]>) => {
          this.onSuccess(res.body, this.requirements);
          this.updateStatusInReqs();
          /* On change selection or import */
          if (oldRequirements) {
            oldRequirements.splice(3, 1);
            this.requirements.splice(6, 1);
            this._jhiAlert.success(this.compareAndUpdateRequirements(oldRequirements, this.requirements));
          }
        });
    } else {
      this._backendService
        .query(CMRequirement, REQUIREMENTS_URI, {
          requirementSet: this.artifactSettings.requirementSet.id,
          attributeIds: this.artifactSettings.parameterAttributes.ids
        })
        .subscribe((res: HttpResponse<CMRequirement[]>) => {
          this.onSuccess(res.body, this.requirements);
          this.updateStatusInReqs();
          if (oldRequirements) {
            this._jhiAlert.success(this.compareAndUpdateRequirements(oldRequirements, this.requirements));
          }
        });
    }
    this._requirementEditorDataShare.setRequirements(this.requirements);
  }

  private onSuccess<T>(res: T[], target: T[]): void {
    const sortedResponse = this._cmUtilService.sortArrayByPredicate(res, 'showOrder');
    for (let i = 0; i < sortedResponse.length; i++) {
      target.push(sortedResponse[i]);
    }
  }

  /**
   * Sets the default or pre-selected values of the status of the requirements.
   */
  updateStatusInReqs(): void {
    if (this.requirements && this.status) {
      this.requirements.forEach(req => {
        /* Extract the category ids present in the requirement list. This facilitates parcing in the view. */
        if (!this.categoryObject.categoryIdsInList.includes(req.categoryId)) {
          this.categoryObject.categoryIdsInList.push(req.categoryId);
        }
        // Sets the display value of the status for the requirement
        this.status.forEach(stat => {
          let found = false;
          // First sorts the status by showOrder.
          // This must be done because the first value is eventually used as default value.
          this._cmUtilService.sortArrayByPredicate(stat.values, 'showOrder');
          // requirement contains preselected values
          if (req.status.length > 0) {
            for (let i = 0; i < req.status.length; i++) {
              const reqStatus = req.status[i];
              if (reqStatus.keyId === stat.id) {
                found = true;
                if (reqStatus.values.length > 0) {
                  const displayValue: string[] = this.getStatusContentFromIds(stat.values, reqStatus.values);
                  // In case the contents of the selected values were not found.
                  if (displayValue.length > 0) {
                    if (stat.type === CMExtensionType.ENUM) {
                      reqStatus.content = displayValue.join(', ');
                    } else {
                      reqStatus.content = displayValue.join('\n');
                    }
                  } else {
                    found = false;
                    /* Uncomment to delete the statusObj from the req's status array in case a selected value id was not found */
                    // req.status.splice(i, 1);
                  }
                }
                break;
              }
            }
          }

          if (!found) {
            let content = '';
            const values = [];
            if (stat.type === CMExtensionType.ENUM) {
              content = stat.values[0].content;
              values.push(stat.values[0].id);
            }
            req.status.push(new CMStatusSubType(stat.id, values, content));
          }
        });
      });
    }
  }

  /**
   * Retrieves the contents corresponding to the given value ids.
   * @param statusValues The list of possible status values.
   * @param referenceValueIds The list of value ids who's content are to be returned.
   */
  getStatusContentFromIds(statusValues: CMExtension[], referenceValueIds: number[]): string[] {
    const returnValue: string[] = [];
    referenceValueIds.forEach(id => {
      // first sor
      for (let i = 0; i < statusValues.length; i++) {
        const value = statusValues[i];
        if (value.id === id) {
          returnValue.push(value.content);
        }
      }
    });

    return returnValue;
  }

  compareAndUpdateRequirements(oldValues: CMRequirement[], newValues: CMRequirement[]): string {
    const toBeRemoved: number[] = [];
    let toBeRemovedMessage = '';
    let addedReqMessage = '';
    let resultMessage = 'The requirement list was successfully changed: \n\n';
    oldValues.forEach((oldReq, index) => {
      const i = newValues.findIndex(elem => elem.id === oldReq.id);
      if (i !== -1) {
        newValues.splice(i, 1);
        /* Change the following check for the appriopriate custom requirement abbr. */
      } else if (i === -1 && !oldReq.name.includes('CUS-')) {
        toBeRemoved.push(index);
      }
    });

    for (let j = 0; j < toBeRemoved.length; j++) {
      const index = toBeRemoved[j];
      const value = oldValues.splice(index, 1)[0];
      toBeRemovedMessage += `- **${value.name}:** ${value.description}\n\n`;
    }

    for (let p = 0; p < newValues.length; p++) {
      const elem = newValues[p];
      addedReqMessage += `- **${elem.name}** ${elem.description}\n\n`;
    }

    if (addedReqMessage !== '') {
      resultMessage += `<p style="color:#b3ffb3"><strong>Requirements added:</strong></p>${addedReqMessage}`;
    }

    if (toBeRemovedMessage !== '') {
      resultMessage += `<p style="color:#ff4d4d"><strong>Requirements removed:</strong><p>${toBeRemovedMessage}`;
    }
    /* update the requirement array */
    // Object.assign(oldValues, newValues);
    /* combines both list containing the filtered values */
    this.requirements = [...oldValues, ...newValues];
    this._cmUtilService.sortArrayByPredicate(this.requirements, 'showOrder');
    return resultMessage;
  }
  // TODO Change the page title accordingly using the ActivatedRoute service.

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
