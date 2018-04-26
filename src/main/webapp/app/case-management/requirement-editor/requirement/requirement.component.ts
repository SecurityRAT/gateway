import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// import { JhiEventManager } from 'ng-jhipster';
import {
  CMRequirement,
  CMExtensionKey,
  CMAttribute,
  CMExtensionType,
  CMExtension,
  CMStatusSubType,
  CMUtilService
} from '../../common';

@Component({
  selector: 'jhi-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: [
    './requirement.component.css'
  ]
})
export class RequirementComponent implements OnInit, OnDestroy {

  @Input() requirements: CMRequirement[];

  @Input() status: CMExtensionKey[];

  @Input() enhancements: CMExtensionKey[];

  @Input() categories: CMAttribute[];

  @Input() parameters: CMAttribute[];

  @Input() categoriesInList: number[];

  statusType: any;

  toggle: any;

  viewProperties: any;

  constructor(
    // private jhiEventManager: JhiEventManager,
    private _cmUtilService: CMUtilService,
  ) {
    this.statusType = {
      enum: CMExtensionType.ENUM,
      freeText: CMExtensionType.FREETEXT
    };
    this.toggle = {
      enhancements: false,
      parameters: true
    };
    this.viewProperties = {
      selectAllState: false
    };
  }

  ngOnInit() {
  }

  selectAllReqs() {
    for (let i = 0; i < this.requirements.length; i++) {
      const element = this.requirements[i];
      element.selected = this.viewProperties.selectAllState;
    }
  }

  getParameters(parameters: number[]): string[] {
    const result: string[] = [];
    parameters.forEach((id) => {
      this._cmUtilService.filterByObj(this.parameters, { id }).forEach((attr) => {
        result.push(attr.name);
      });
    });

    return result;
  }

  getActiveEnhancement(enhancements: CMExtensionKey[], req: CMRequirement): string {
    if (req.enhancements.length === 1) {
      return `${req.enhancements[0].keyId}${req.id}`;
    } else if (req.enhancements.length === 0) {
      return '';
    }

    return `${enhancements[0].id}${req.id}`;
  }

  getSelectedRequirements(): CMRequirement[] {
    return this.requirements.filter((req) => req.selected);
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

  ngOnDestroy() {
  }
}
