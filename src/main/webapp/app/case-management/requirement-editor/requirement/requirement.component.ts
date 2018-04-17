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

  constructor(
    // private jhiEventManager: JhiEventManager,
    private cmUtilService: CMUtilService
  ) {
    this.statusType = {
      enum: CMExtensionType.ENUM,
      freeText: CMExtensionType.FREETEXT
    };
    this.toggle = {
      enhancements: false,
      parameters: true
    };
  }

  ngOnInit() {
  }

  getParameters(parameters: number[]): string[] {
    const result: string[] = [];
    parameters.map((id) => {
      this.cmUtilService.filterAttributesByObj(this.parameters, { id }).map((attr) => {
        result.push(attr.name);
      });
    });

    return result;
  }

  getSelectedRequirements(): CMRequirement[] {
    return this.requirements.filter((req) => req.selected);
  }

  selectStatus(status: CMStatusSubType, allStatusValues: CMExtension[], newValueId: number, multiselect = false) {
    let newValueContent = '';
    allStatusValues.forEach((valueItem) => {
      if (valueItem.id === newValueId) {
        newValueContent = valueItem.content;
      }
    });
    /* Multiselection of status value is not possible */
    if (!multiselect) {
      // remove old value
      status.values = [newValueId];
      status.content = newValueContent;
    } else {
      /* Multiselection of status values is allowed */
      const index: number = status.values.indexOf(newValueId);
      /* selected value was already selected => deselection */
      if (index !== -1) {
        const contents = status.content.split(',');
        /* Minimum selection is one */
        if (contents.length > 1) {
          status.values.splice(index, 1);
          status.content = contents.filter((elem) => elem !== newValueContent).join(',');
        }
      } else {
        /* selected value was not preselect => selection */
        status.values.push(newValueId);
        status.content = `${status.content}, ${newValueContent}`;
      }
    }
    console.log(this.requirements);
  }

  ngOnDestroy() {
  }
}
