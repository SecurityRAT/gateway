import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CUSTOMREQUIREMENT_PREFIX, CMAttributeKey } from '../../common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequirementEditorDataShareService } from '../requirement-editor-data-share.service';
import {
  CMEnhancementSubType,
  CMRequirement,
  CMExtensionKey,
  CMAttribute,
  CMExtensionType,
  CMExtension,
  CMStatusSubType
} from '../../common';

@Component({
  selector: 'jhi-custom-requirement',
  templateUrl: './custom-requirement.component.html',
  styles: [`
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`]
})
export class CustomRequirementComponent implements OnInit {

  @Output() customMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  openModals: any[];
  closeResult: string;
  enhancementNames: string[];
  customizes: boolean;
  editMode: boolean;
  statusType: any;

  attributeList: CMAttribute[];

  customRequirementList: CMRequirement[];
  customRequirementObj: CMRequirement;
  customRequirementEditCopy: CMRequirement;
  cmRequirementBeforeEdit: CMRequirement;

  enhancementList: CMExtensionKey[];
  status: CMExtensionKey[];

  categories: CMAttributeKey[];
  categoriesInList: number[];

  modalRef: any;

  constructor(
    private modalService: NgbModal,
    private _requirementEditorDataShare: RequirementEditorDataShareService
  ) {
    this.attributeList = this._requirementEditorDataShare.getAttributes();
    this.categories = this._requirementEditorDataShare.getCategories();
    // this.categoriesInList = this._requirementEditorDataShare.getCategoriesInList();

    this.customRequirementList = this._requirementEditorDataShare.getCustomRequirements();
    this.enhancementList = this._requirementEditorDataShare.getEnhancements();
    this.status = this._requirementEditorDataShare.getStatus();

    this.customizes = true;
    this.editMode = false;
    this.categoriesInList = [];
    this.enhancementNames = [];
    this.openModals = [];
    this.statusType = {
      enum: CMExtensionType.ENUM,
      freeText: CMExtensionType.FREETEXT
    };

    // this.collectEnhancementNames(this.enhancementList);
    this.createEmptyCustomRequirementObject();
    this.filterCategorieIds();

  }

  ngOnInit() { }

  /**
   * This method creates an empty nested Object. It is necessary when a user wants to create a new CustomRequirement
   */
  createEmptyCustomRequirementObject() {
    this.customRequirementObj = new CMRequirement(null, null, null, null, [], [], [], [], null, null, null, null);
    this.status.forEach((element: CMExtensionKey) => {
      this.customRequirementObj.status.push(new CMStatusSubType(element.id, null, null));
    });
    this.enhancementList.forEach((element: CMExtensionKey) => {
      const tempEnhancementSubType: CMEnhancementSubType = new CMEnhancementSubType(element.id, []);
      tempEnhancementSubType.contents.push(new CMExtension(element.id, null, null, null));
      this.customRequirementObj.enhancements.push(tempEnhancementSubType);
    });
    this.customRequirementObj.name = this.setUpCustomRequirementName();
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
    this.customRequirementList.forEach((element) => {
      tempNumber = +element.name.slice(CUSTOMREQUIREMENT_PREFIX.length, element.name.length);
      if (maxNumber < tempNumber) {
        maxNumber = tempNumber;
      }
    });
    maxNumber++;
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
  filterCategorieIds() {
    this.customRequirementList.forEach((element) => {
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
  open(content: any, useOldCustReq: boolean ) {
    const tempArray = [];
    if (!useOldCustReq) {
    this.createEmptyCustomRequirementObject();
    }
    this.modalService.open(content, {backdrop: false, centered: true});
   // const modalReference = this.modalService.open(content, {backdrop: false, centered: true});
    // modalReference.result.then((result) => {
    //     // this.editMode = false;
    //   }, (reason) => {
    //    // this.editMode = false;
    //   });

     // this.openModals.push(modalReference);
    }

  closeAllOpenModals() {
    this.openModals.forEach((element) => {
      element.close();
    });
    this.openModals = [];
  }

  /**
   * Deep-Copy a given CMRequirement into the EditCopy.
   * This makes sure that we work with a copy while editing
   * @param cmRequirementObj Object which should be deep-copied
   */
  editCustomRequirement(cmRequirementObj: CMRequirement) {
    this.editMode = true;
    // way to deepcopy nested object
    this.customRequirementEditCopy = JSON.parse(JSON.stringify(cmRequirementObj));
  }

  /**
   * After editing the customRequirement gets added to the List of customRequirements
   */
  editingFinished() {
    this.customRequirementList.forEach((element: CMRequirement, index) => {
      if (element.name === this.customRequirementEditCopy.name) {
        this.customRequirementList[index] = Object.assign({}, this.customRequirementEditCopy);
        this.searchAndRemoveEmptyCategories();
        this.filterCategorieIds();
      }
    });
    this.editMode = false;
  }

  /**
   * Changes the "customizes"-variable. It is needed to open/close this component inside the editor-component
   */
  customize() {
    this.customizes = !this.customizes;
    this.customMode.emit(this.customizes);
  }

  /**
   * After filling the form, this function pushes the new cusgtomRequirement to the customRequirementList
   */
  submitCustomRequirement() {
    this.customRequirementList.push(this.customRequirementObj);
    this.filterCategorieIds();
  }

  /**
   * Searches the name of a given customRequirement-Object and delets this in the customRequirementList.
   * @param cmRequirementObj customRequirment-Object which name is used to find and delete it in the customRequirementList
   */
  removeCustomRequirement(cmRequirementObj: CMRequirement) {

    this.customRequirementList.forEach((element, index) => {

      if (cmRequirementObj.name === element.name) {
        this.customRequirementList.splice(index, 1);
      }
    });
    this.searchAndRemoveEmptyCategories();
  }
  // this.filterCategorieIds();

  /**
   * Finds all categories without CustomRequirements and removes them from the categoriesInList.
   * This can be the case, after we removed or edited customRequirements
   */
  searchAndRemoveEmptyCategories() {
    this.categoriesInList.forEach((cat) => {
      let categorieCounter: number;
      categorieCounter = 0;
      this.customRequirementList.forEach((custReq) => {
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

  selectStatus(status: CMStatusSubType, newValue: CMExtension, multiselect = false) {
    /* Multiselection of status value is not possible */
    if (!multiselect) {
      // remove old value
      status.values = [newValue.id];
      status.content = newValue.content;
    } else {
      /* Multiselection of status values is allowed */
      const index: number = status.values.indexOf(newValue.id);
      /* selected value was already selected => deselection */
      if (index !== -1) {
        const contents = status.content.split(',');
        /* Minimum selection is one */
        if (contents.length > 1) {
          status.values.splice(index, 1);
          status.content = contents.filter((elem) => elem.trim().toLowerCase() !== newValue.content.trim().toLowerCase()).join(',');
        }
      } else {
        /* selected value was not preselected => selection */
        status.values.push(newValue.id);
        status.content = `${status.content}, ${newValue.content}`;
      }
    }
  }

}
