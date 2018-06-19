import { Component, OnInit } from '@angular/core';
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
  ATTRIBUTEKEY_URI,
  ArtifactInfo
} from '../../common/';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { RequirementEditorDataShareService } from '../requirement-editor-data-share.service';
// import { JhiEventManager } from 'ng-jhipster';

type CategoryObject = {
  categories: CMAttribute[],
  formattedCategories: CMAttribute[],
  categoryIdsInList: number[]
};

type TagObject = {
  tags: CMAttribute[],
  tagKeys: CMAttributeKey[]
};

type ArtifactSettings = {
  artifactInfo: ArtifactInfo,
  generatedOn?: Date,
  lastSaved?: Date,
  parameterAttributes: {
    ids: number[],
    content: CMAttribute[]
  },
  parameterAttributeKeys: {
    ids: number[],
    content: CMAttributeKey[]
  },
  requirementSet: {
    id: number,
    content: CMRequirementSet
  }
};
@Component({
  selector: 'jhi-editor',
  templateUrl: 'editor.component.html'
})
export class EditorComponent implements OnInit {

  artifactSettings: ArtifactSettings;
  enhancements: CMExtensionKey[];
  status: CMExtensionKey[];
  tags: CMAttribute[];
  requirements: CMRequirement[];
  totalRequests: number;
  categoryObject: CategoryObject;
  tagObject: TagObject;
  customMode = false;

  changeMode(cm: boolean) {
    this.customMode = cm;
  }
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cmUtilService: CMUtilService,
    private _backendService: CaseManagementBackendService,
    private _requirementEditorDataShare: RequirementEditorDataShareService
    // private jhiEventManager: JhiEventManager
  ) {
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

  ngOnInit() {
    // extracts artifact settings from matrix params
    this._activatedRoute.paramMap.subscribe((values) => {
      if (values.has(ARTIFACTNAME_PARAM) && values.has(REQUIREMENTSET_PARAM) &&
        values.has(ATTRIBUTE_PARAM) && values.has(ATTRIBUTEKEYS_PARAM)) {
        this.artifactSettings = {
          artifactInfo: new ArtifactInfo(values.get(ARTIFACTNAME_PARAM)),
          parameterAttributes: {
            ids: this._cmUtilService.convertStringToNumberArray(values.get(ATTRIBUTE_PARAM), true),
            content: []
          },
          parameterAttributeKeys: {
            ids: this._cmUtilService.convertStringToNumberArray(values.get(ATTRIBUTEKEYS_PARAM), true),
            content: []
          },
          requirementSet: {
            id: this._cmUtilService.convertStringToNumberArray(values.get(REQUIREMENTSET_PARAM), true)[0],
            content: new CMRequirementSet(1, 'Test requirement set', 10)
          },
          generatedOn: new Date()
        };
        this.loadAll();
        this.loadRequirements();
      }

    });
  }

  loadAll() {
    // implement error handlers
    /* Mock load Attribute with ids */
    this._backendService.getAttributes(this.artifactSettings.parameterAttributes.ids).subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.artifactSettings.parameterAttributes.content);
      this._requirementEditorDataShare.setAttributes(this.artifactSettings.parameterAttributes.content);
    });

    this._backendService.getAttributeKeys(this.artifactSettings.parameterAttributeKeys.ids).subscribe((res: HttpResponse<CMAttributeKey[]>) => {
      this.onSuccess(res.body, this.artifactSettings.parameterAttributeKeys.content);
      const filter: CMAttributeKey[] = [];
      this.artifactSettings.parameterAttributeKeys.ids.forEach((id) => {
        filter.push(...this._cmUtilService.filterByObj(this.artifactSettings.parameterAttributeKeys.content, { id }));
      });
      this.artifactSettings.parameterAttributeKeys.content = filter;
    });

    // /* Backend load Attribute with ids */
    // this._backendService.query(CMAttribute, ATTRIBUTE_URI, { ids: this.artifactSettings.parameterAttributes.ids }).subscribe((res: HttpResponse<CMAttribute[]>) => {
    //   this.onSuccess(res.body, this.artifactSettings.parameterAttributes.content);
    // });

    // /* Backend load Attribute keys and requirement sets */
    // this._backendService.query(CMAttributeKey, ATTRIBUTEKEY_URI, { ids: this.artifactSettings.parameterAttributeKeys.ids }).subscribe((res: HttpResponse<CMAttributeKey[]>) => {
    //   this.onSuccess(res.body, this.artifactSettings.parameterAttributeKeys.content);
    // });
    // this._backendService.query(CMRequirementSet, REQUIREMENTSET_URI, { ids: this.artifactSettings.requirementSet.id }).subscribe((res: HttpResponse<CMRequirementSet[]>) => {
    //   this.artifactSettings.requirementSet.content = res.body[0];
    // });

    // /* Backend load Categories */
    // this._backendService.query(CMAttribute, ATTRIBUTES_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.CATEGORY })
    //   .subscribe((res: HttpResponse<CMAttribute[]>) => {
    //     this.onSuccess(res.body, this.categoryObject.categories);
    //     this._cmUtilService.formatCategoryListForView(this.categoryObject.categories, '', '>');
    //   });

    /* Mock load Categories */
    this._backendService.getMockCategories().subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.categoryObject.categories);
      this.categoryObject.formattedCategories = this._cmUtilService.formatCategoryListForView(this.categoryObject.categories, '', '>');
      this._requirementEditorDataShare.setCategories( this.categoryObject.formattedCategories);
      this._requirementEditorDataShare.setCategoriesInList(this.categoryObject.categoryIdsInList);
    });

    /* Load FE_TAGS */
    // this._backendService.query(CMAttribute, ATTRIBUTES_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.FETAG })
    //   .subscribe((res: HttpResponse<CMAttribute[]>) => {
    //     this.onSuccess(res.body, this.tagObject.tags);
    //   });
    // this._backendService.query(CMAttributeKey, ATTRIBUTEKEYS_URI, { requirementSet: this.artifactSettings.requirementSet.id, type: CMAttributeType.FETAG })
    //   .subscribe((res: HttpResponse<CMAttributeKey[]>) => {
    //     this.onSuccess(res.body, this.tagObject.tagKeys);
    //   });

    /* Mock load FE_TAGS */
    this._backendService.getMockTagKeys().subscribe((res: HttpResponse<CMAttributeKey[]>) => {
      this.onSuccess(res.body, this.tagObject.tagKeys);
    });
    this._backendService.getMockTags().subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.tagObject.tags);
    });

    /* Backend load ENHANCEMENT and STATUS */
    // this._backendService.query(CMExtensionKey, ENHANCEMENTS_URI, { requirementSet: this.artifactSettings.requirementSet.id })
    //   .subscribe((res: HttpResponse<CMExtensionKey[]>) => {
    //     this.onSuccess(res.body, this.enhancements);
    //   });
    // this._backendService.query(CMExtensionKey, STATUS_URI, { requirementSet: this.artifactSettings.requirementSet.id })
    //   .subscribe((res: HttpResponse<CMExtensionKey[]>) => {
    //     this.onSuccess(res.body, this.status);
    //   });

    /* Mock load ENHANCEMENT and STATUS */
    this._backendService.findEnhancements(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
      this.onSuccess(res.body, this.enhancements);
      this._requirementEditorDataShare.setEnhancements(this.enhancements);
    });
    this._backendService.findStatus(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
      this.onSuccess(res.body, this.status);
      this.updateStatusInReqs();
      this._requirementEditorDataShare.setStatus(this.status);
    });

  }

  private loadRequirements() {
    // this._backendService.query(CMRequirement, REQUIREMENTS_URI, {
    //   requirementSet: this.artifactSettings.requirementSet.id,
    //   attributeIds: this.artifactSettings.parameterAttributes.ids
    // }).subscribe((res: HttpResponse<CMRequirement[]>) => {
    //   this.onSuccess(res.body, this.requirements);
    //   this.updateStatusInReqs();
    // });
    /* Mock load REQUIREMENTS */
    this._backendService.fetchRequirements(this.artifactSettings.requirementSet.id, this.artifactSettings.parameterAttributes.ids)
      .subscribe((res: HttpResponse<CMRequirement[]>) => {
        this.onSuccess(res.body, this.requirements);
        this.updateStatusInReqs();
        this._requirementEditorDataShare.setRequirements(this.requirements);
      });
  }

  private onSuccess<T>(res: T[], target: T[]) {
    const sortedResponse = this._cmUtilService.sortArrayByPredicate(res, 'showOrder');
    for (let i = 0; i < sortedResponse.length; i++) {
      target.push(sortedResponse[i]);
    }
  }

  /**
   * Sets the default or pre-selected values of the status of the requirements.
   */
  updateStatusInReqs() {
    if (this.requirements && this.status) {
      this.requirements.forEach((req) => {
        /* Extract the category ids present in the requirement list. This facilitates parcing in the view. */
        if (this.categoryObject.categoryIdsInList.indexOf(req.categoryId) === -1) {
          this.categoryObject.categoryIdsInList.push(req.categoryId);
        }
        // Sets the display value of the status for the requirement
        this.status.forEach((stat) => {
          let found = false;
          // First sorts the status by showOrder.
          // This must be done because the first value is eventually used as default value.
          this._cmUtilService.sortArrayByPredicate(stat.values, 'showOrder');
          // requirement contains preselected values
          if (req.status.length > 0) {
            for (let i = 0; i < req.status.length; i++) {
              const reqStatus = req.status[i];
              if (reqStatus.keyId === stat.id) {
                const displayValue: string[] = this.getStatusContentFromIds(stat.values, reqStatus.values);
                // In case the contents of the selected values were not found.
                if (displayValue !== undefined && displayValue.length > 0) {
                  found = true;
                  if (stat.type === CMExtensionType.ENUM) {
                    reqStatus.content = displayValue.join(', ');
                  } else {
                    reqStatus.content = displayValue.join('\n');
                  }
                }
                /* Uncomment to delete the statusObj from the req's status array in case a selected value id was not found */
                // else {
                //   req.status.splice(i, 1);
                // }
                break;

              }
            }
          }

          if (!found || req.status.length === 0) {
            let content = '';
            const values = [];
            // TODO ask whether a default value should be selected
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
    const returnValue = [];
    referenceValueIds.forEach((id) => {
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
  // TODO Change the page title accordingly using the ActivatedRoute service.

}
