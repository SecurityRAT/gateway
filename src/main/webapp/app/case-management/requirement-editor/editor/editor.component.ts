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
  CMExtensionType
} from '../../common/';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
// import { JhiEventManager } from 'ng-jhipster';

type CategoryObject = {
  categories: CMAttribute[],
  formattedCategories: CMAttribute[],
  categoryIdsInList: number[]
};
@Component({
  selector: 'jhi-editor',
  template: `
    <jhi-requirement [requirements]="requirements" [status]="status" [categories]="categoryObject.formattedCategories"
    [enhancements]="enhancements" [parameters]="artifactSettings.parameterAttributes.content" [categoriesInList]="categoryObject.categoryIdsInList">
    </jhi-requirement>
  `
})
export class EditorComponent implements OnInit {

  artifactSettings: any;
  enhancements: CMExtensionKey[];
  status: CMExtensionKey[];
  tags: CMAttribute[];
  requirements: CMRequirement[];
  totalRequests: number;
  categoryObject: CategoryObject;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cmUtilService: CMUtilService,
    private backendService: CaseManagementBackendService,
    // private jhiEventManager: JhiEventManager
  ) {
    this.categoryObject = {
      formattedCategories: [],
      categoryIdsInList: [],
      categories: []
    };
    this.artifactSettings = {};
    this.enhancements = [];
    // this.status = [];
    this.tags = [];
    this.requirements = [];
    this.totalRequests = 8; // this will help to the progressbar.
  }

  ngOnInit() {
    // extracts artifact settings from matrix params
    this.activatedRoute.paramMap.subscribe((values) => {
      if (values.has(ARTIFACTNAME_PARAM) && values.has(REQUIREMENTSET_PARAM) &&
        values.has(ATTRIBUTE_PARAM) && values.has(ATTRIBUTEKEYS_PARAM)) {
        this.artifactSettings.name = values.get(ARTIFACTNAME_PARAM);
        this.artifactSettings.parameterAttributes = {
          ids: this.cmUtilService.convertParamMapStringToNumberArray(values.get(ATTRIBUTE_PARAM), true),
          content: []
        };
        this.artifactSettings.parameterAttributeKeys = {
          ids: this.cmUtilService.convertParamMapStringToNumberArray(values.get(ATTRIBUTE_PARAM), true),
          content: []
        };
        this.artifactSettings.requirementSet = {
          id: this.cmUtilService.convertParamMapStringToNumberArray(values.get(ATTRIBUTE_PARAM), true)[0]
        };
        this.loadAll();
        this.loadRequirements();
      }

    });
  }

  loadAll() {
    // implement error handlers
    this.backendService.getAttributes(this.artifactSettings.parameterAttributes.ids).subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.artifactSettings.parameterAttributes.content);
    });

    this.backendService.getAttributeKeys(this.artifactSettings.parameterAttributeKeys.ids).subscribe((res: HttpResponse<CMAttributeKey[]>) => {
      this.onSuccess(res.body, this.artifactSettings.parameterAttributeKeys.content);
    });
    this.backendService.getRequirementSets([this.artifactSettings.requirementSet.id]).subscribe((res: HttpResponse<CMRequirementSet[]>) => {
      this.artifactSettings.requirementSet.content = res.body[0];
    });
    this.backendService.findAttributes(this.artifactSettings.requirementSet.id, CMAttributeType.CATEGORY).subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.categoryObject.categories);
      this.formatCategoryListForView(this.categoryObject.categories, '');
    });
    // this.backendService.getMockCategories().subscribe((res: HttpResponse<CMAttribute[]>) => {
    //   this.onSuccess(res.body, this.categoryObject.categories);
    //   this.formatCategoryListForView(this.categoryObject.categories, '');
    // });
    this.backendService.findAttributes(this.artifactSettings.requirementSet.id, CMAttributeType.FETAG).subscribe((res: HttpResponse<CMAttribute[]>) => {
      this.onSuccess(res.body, this.tags);
    });
    this.backendService.findEnhancements(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
      this.onSuccess(res.body, this.enhancements);
    });
    this.backendService.findStatus(this.artifactSettings.requirementSet.id).subscribe((res: HttpResponse<CMExtensionKey[]>) => {
      this.onSuccess(res.body, this.status);
      this.updateStatusInReqs();
    });

  }

  private loadRequirements() {
    this.backendService.fetchRequirements(this.artifactSettings.requirementSet.id, this.artifactSettings.parameterAttributes.ids)
      .subscribe((res: HttpResponse<CMRequirement[]>) => {
        this.onSuccess(res.body, this.requirements);
        this.updateStatusInReqs();
      });
  }

  private onSuccess<T>(res: T[], target: T[]) {
    const sortedResponse = this.cmUtilService.sortArrayByPredicate(res, 'showOrder');
    for (let i = 0; i < sortedResponse.length; i++) {
      target.push(sortedResponse[i]);
    }
  }

  /**
   * Sets the default or pre-selected values of the status of the requirements.
   */
  updateStatusInReqs() {
    if (this.requirements && this.status) {
      this.requirements.map((req) => {
        /* Extract the category ids present in the requirement list. This facilitates parcing in the view. */
        if (this.categoryObject.categoryIdsInList.indexOf(req.categoryId) === -1) {
          this.categoryObject.categoryIdsInList.push(req.categoryId);
        }
        // Sets the display value of the status for the requirement
        this.status.map((stat) => {
          let found = false;
          // First sorts the status by showOrder.
          // This must be done because the first value is eventually used as default value.
          this.cmUtilService.sortArrayByPredicate(stat.values, 'showOrder');
          // requirement contains preselected values
          if (req.status.length > 0) {
            for (let i = 0; i < req.status.length; i++) {
              const reqStatus = req.status[i];
              if (reqStatus.keyId === stat.id) {
                found = true;
                const displayValue: string[] = this.getStatusContentFromIds(stat.values, reqStatus.values);
                if (stat.type === CMExtensionType.ENUM) {
                  reqStatus.content = displayValue.join(', ');
                } else {
                  reqStatus.content = displayValue.join('\n');
                }
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
   * Retrieves a list of status contents for a list of value ids from a list of all status values
   * @param statusValues The list of possible values
   * @param referenceValueIds The value ids
   */
  getStatusContentFromIds(statusValues: CMExtension[], referenceValueIds: number[]): string[] {
    const returnValue = referenceValueIds.map((id) => {
      // first sor
      for (let i = 0; i < statusValues.length; i++) {
        const value = statusValues[i];
        if (value.id === id) {
          return value.content;
        }
      }
    });

    return returnValue;
  }

  formatCategoryListForView(categories: CMAttribute[], prefixName: string) {
    categories.forEach((cat) => {
      const catCopy: CMAttribute = Object.assign({}, cat);
      catCopy.name = prefixName + catCopy.name;
      if (catCopy.children.length > 0) {
        this.formatCategoryListForView(cat.children, `${catCopy.name} > `);
        delete catCopy.children;
      }
      this.categoryObject.formattedCategories.push(catCopy);
    });
  }

  // TODO Change the page title accordingly using the ActivatedRoute service.

}
