import { Component, OnInit, Input } from '@angular/core';
import { CMAttribute, CMRequirement, CMUtilService } from '../../common';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() tags: CMAttribute[];

  @Input() tagKeys: CMAttribute[];

  @Input() categories: CMAttribute[];

  @Input() requirements: CMRequirement[];

  selectedTags: any;

  selectedCategories: number[];

  panelTags: any;

  panelCategory: any;

  constructor(
    private _cmUtilService: CMUtilService
  ) {
    this.selectedTags = {};
    this.selectedCategories = [];
    this.panelTags = {
      title: 'Tags',
      id: 'tagsPanel',
      active: false
    };
    this.panelCategory = {
      title: 'Categories',
      id: 'categoriesPanel',
      active: false
    };
  }

  ngOnInit() {
  }

  updateSelectedTags(changedTag: CMAttribute) {
    if (this.selectedTags[changedTag.keyId] === undefined) {
      this.selectedTags[changedTag.keyId] = new Array<number>();
    }
    this._updateSelectedElementsInArray(this.selectedTags[changedTag.keyId], changedTag);
    this.applyFilters();
  }

  updateSelectCategoriesAndFilter(changedCat: CMAttribute) {
    this._updateSelectedElementsInArray(this.selectedCategories, changedCat);
    this.applyFilters();
  }

  applyFilters() {
    const keys: string[] = Object.keys(this.selectedTags);
    let empty = true;
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      if (this.selectedTags[element].length > 0) {
        empty = false;
        break;
      }
    }

    this._cmUtilService.setShowViewOptionInReqs(this.requirements, true);

    if (this.selectedCategories.length > 0 || !empty) {
      this._cmUtilService.filterRequirementsByCategories(this.requirements, this.selectedCategories);
      this._cmUtilService.filterRequirementsByFeTags(this.requirements, this.selectedTags);
    }
  }

  beforePanelChange(event: NgbPanelChangeEvent) {
    switch (event.panelId) {
      case this.panelTags.id:
        this.panelTags.active = event.nextState;
        this.panelCategory.active = false;
        break;
      case this.panelCategory.id:
        this.panelCategory.active = event.nextState;
        this.panelTags.active = false;
        break;
      default:
        event.preventDefault();
        break;
    }
  }

  private _updateSelectedElementsInArray(array: number[], elem: CMAttribute) {
    let index = -1;
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        const selectedId = array[i];
        /* If ids match then the element must have already been selected and it is been deselected */
        if (selectedId === elem.id && !elem.selected) {
          index = i;
          break;
        }
      }
    }
    /* If the element already exist => deselection and the element is removed from the list */
    if (index >= 0) {
      array.splice(index, 1);
    } else {
      array.push(elem.id);
    }
  }
}
