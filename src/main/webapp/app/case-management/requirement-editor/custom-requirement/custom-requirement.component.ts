import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequirementEditorDataShareService } from '../requirement-editor-data-share.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  CMEnhancementSubType,
  CMRequirement,
  CMExtensionKey,
  CMAttribute,
  CMExtensionType,
  CMExtension,
  CMStatusSubType,
  CUSTOMREQUIREMENT_PREFIX,
  CMAttributeKey
} from '../../common';

@Component({
  selector: 'jhi-custom-requirement',
  templateUrl: 'custom-requirement.component.html',
  styleUrls: ['../requirement/requirement.component.scss']
})
export class CustomRequirementComponent implements OnInit {
  @Output() customMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeResult: string;
  // list of all enhancementNames
  enhancementNames: string[];
  // status if user is in the Custom-Requirement view. Important to load the correct component inside the editor
  customizes: boolean;
  // true while user is editing existing custom-Requirement
  editMode: boolean;
  statusType: any;

  // List of all attributes.
  attributeList: CMAttribute[];

  // list of all customRequirements
  customRequirementList: CMRequirement[];
  // CustomRequirement-Object. Used when user adds a new CustomRequirement
  customRequirementObj: CMRequirement;
  // CustomRequirement especially for editing .Used when user edits existing customRequiremnt
  customRequirementEditCopy: CMRequirement;
  // contains the customRequirement before editing. when user cancels editing this object is used to restore old values
  cmRequirementBeforeEdit: CMRequirement;

  enhancementList: CMExtensionKey[];
  status: CMExtensionKey[];

  categories: CMAttributeKey[];

  // list of categoryIds which are in our table/list
  categoriesInList: number[];
  faChevronLeft = faChevronLeft;

  constructor(private modalService: NgbModal, private _requirementEditorDataShare: RequirementEditorDataShareService) {
    this.attributeList = this._requirementEditorDataShare.getAttributes();
    this.categories = this._requirementEditorDataShare.getCategories();

    this.customRequirementList = this._requirementEditorDataShare.getCustomRequirements();
    this.enhancementList = this._requirementEditorDataShare.getEnhancements();
    this.status = this._requirementEditorDataShare.getStatus();

    this.customizes = true;
    this.editMode = false;
    this.categoriesInList = [];
    this.enhancementNames = [];
    this.statusType = {
      enum: CMExtensionType.ENUM,
      freeText: CMExtensionType.FREETEXT
    };

    this.createEmptyCustomRequirementObject();
    this.filterCategorieIds();
  }

  ngOnInit(): void {}

  /**
   * This method creates an empty nested Object. It is necessary when a user wants to create a new CustomRequirement
   */
  createEmptyCustomRequirementObject(): void {
    this.customRequirementObj = new CMRequirement(
      null as any,
      this.setUpCustomRequirementName(),
      null as any,
      null as any,
      [],
      [],
      [],
      [],
      null as any,
      null as any,
      null as any,
      null
    );
    this.customRequirementObj.categoryId = this.categories[0].id;
    this.status.forEach((element: CMExtensionKey) => {
      const defaultStatusContent = new CMStatusSubType(element.id, []);
      if (element.type === this.statusType.enum && element.values !== undefined) {
        defaultStatusContent.content = element.values[0].content;
      }
      this.customRequirementObj.status.push(defaultStatusContent);
    });
    this.enhancementList.forEach((element: CMExtensionKey) => {
      const tempEnhancementSubType: CMEnhancementSubType = new CMEnhancementSubType(element.id, []);
      tempEnhancementSubType.contents.push(new CMExtension(element.id, ''));
      this.customRequirementObj.enhancements.push(tempEnhancementSubType);
    });
  }

  /**
   * To name the CustomRequirement correctly, the method finds out the name with the highest
   * number of all CustomRequirements and gives back the correct name for the new
   * @returns string of the next name for a newly created CustomRequirement
   */
  setUpCustomRequirementName(): string {
    let maxNumber: number;
    let tempNumber: number;
    maxNumber = 0;
    this.customRequirementList.forEach(element => {
      // Cuts the numbers of "CUS-XX" and saves it in tempNumber
      tempNumber = +element.name.slice(CUSTOMREQUIREMENT_PREFIX.length, element.name.length);
      if (maxNumber < tempNumber) {
        maxNumber = tempNumber;
      }
    });
    maxNumber++;
    // Depending on the highest number this method return CUS-X or CUS-XX
    if (maxNumber < 10) {
      return CUSTOMREQUIREMENT_PREFIX + '0' + maxNumber;
    } else {
      return CUSTOMREQUIREMENT_PREFIX + maxNumber;
    }
  }

  /**
   * Finds out the categories of all CustomRequirements and pushes them into
   * the categoriesInList
   */
  filterCategorieIds(): void {
    this.customRequirementList.forEach(element => {
      if (!this.categoriesInList.includes(element.categoryId)) {
        this.categoriesInList.push(element.categoryId);
      }
    });
  }

  /**
   * Opens the Dialog for adding/editing.
   * @param content templateName of HTML
   * @param useOldCustReq set to true if need a empty custom requirement
   */
  open(content: any, useOldCustReq: boolean): void {
    if (!useOldCustReq) {
      this.createEmptyCustomRequirementObject();
    }
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  /**
   * Deep-Copy a given CMRequirement into the EditCopy.
   * This makes sure that we work with a copy while editing
   * @param cmRequirementObj Object which should be deep-copied
   */
  editCustomRequirement(cmRequirementObj: CMRequirement): void {
    this.editMode = true;
    // way to deepcopy nested object
    this.customRequirementObj = JSON.parse(JSON.stringify(cmRequirementObj));
    // this.customRequirementObj = Object.assign({}, cmRequirementObj);
  }

  /**
   * Changes the "customizes"-variable. It is needed to open/close this component inside the editor-component
   */
  customize(): void {
    this.customizes = !this.customizes;
    this.customMode.emit(this.customizes);
  }

  /**
   * Searches the name of a given customRequirement-Object and delets this in the customRequirementList.
   * @param cmRequirementObj customRequirment-Object which name is used to find and delete it in the customRequirementList
   */
  removeCustomRequirement(cmRequirementObj: CMRequirement): void {
    this.customRequirementList.forEach((element, index) => {
      if (cmRequirementObj.name === element.name) {
        this.customRequirementList.splice(index, 1);
      }
    });
    this.searchAndRemoveEmptyCategories();
  }

  /**
   * Makes sure when user wants to add a Custom Requirement, that all important dropdowns are set
   * @param cmRequirementObj CustomtomRequirement that we want to check
   */
  importantFieldsAreSet(cmRequirementObj: CMRequirement): boolean {
    let correctIndex = 0;

    cmRequirementObj.status.forEach((element, index) => {
      if (element.keyId === 1) {
        correctIndex = index;
      }
    });
    return cmRequirementObj.categoryId !== null && cmRequirementObj.status[correctIndex].content !== null;
  }

  /**
   * Finds all categories without CustomRequirements and removes them from the categoriesInList.
   * This can be the case, after we removed or edited customRequirements
   */
  searchAndRemoveEmptyCategories(): void {
    this.categoriesInList.forEach(cat => {
      let categorieCounter: number;
      categorieCounter = 0;
      this.customRequirementList.forEach(custReq => {
        if (cat === custReq.categoryId) {
          categorieCounter++;
        }
      });
      if (categorieCounter === 0) {
        this.categoriesInList.forEach((element, index) => {
          if (element === cat) {
            this.categoriesInList.splice(index, 1);
          }
        });
      }
    });
  }

  selectStatus(status: CMStatusSubType, newValue: CMExtension, multiselect = false): void {
    /* Multiselection of status value is not possible */
    if (!multiselect) {
      // remove old value
      status.values = [newValue.id];
      status.content = newValue.content;
    } else {
      /* Multiselection of status values is allowed */
      const index: number = status.values.indexOf(newValue.id);
      /* selected value was already selected => deselection */
      if (index !== -1 && status.content !== undefined) {
        const contents = status.content.split(',');
        /* Minimum selection is one */
        if (contents.length > 1) {
          status.values.splice(index, 1);
          status.content = contents.filter(elem => elem.trim().toLowerCase() !== newValue.content.trim().toLowerCase()).join(',');
        }
      } else {
        /* selected value was not preselected => selection */
        status.values.push(newValue.id);
        status.content = `${status.content}, ${newValue.content}`;
      }
    }
  }

  saveCustomRequirement(): void {
    if (this.editMode) {
      this.updateCustomRequirement();
    } else {
      this.addCustomRequirement();
    }
  }

  /**
   * After filling the form, this function pushes the new customRequirement to the customRequirementList
   */
  addCustomRequirement(): void {
    this.customRequirementList.push(this.customRequirementObj);
    this.filterCategorieIds();
  }

  /**
   * After editing the customRequirement gets added to the List of customRequirements
   */
  updateCustomRequirement(): void {
    this.customRequirementList.forEach((element: CMRequirement, index) => {
      if (element.name === this.customRequirementObj.name) {
        this.customRequirementList[index] = Object.assign({}, this.customRequirementObj);
        this.searchAndRemoveEmptyCategories();
        this.filterCategorieIds();
      }
    });
    this.editMode = false;
  }
}
