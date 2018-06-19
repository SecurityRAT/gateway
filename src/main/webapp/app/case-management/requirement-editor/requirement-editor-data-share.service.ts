import { Injectable } from '@angular/core';
import { CMRequirement, CMExtensionKey, CMAttribute } from '../common/';

@Injectable()
export class RequirementEditorDataShareService {
  requirements: CMRequirement[];
  customRequirements: CMRequirement[];
  enhancements: CMExtensionKey[];
  attributes: CMAttribute[];
  status:  CMExtensionKey[];
  categories: CMAttribute[];
  categoriesInList: number[];

  constructor() { }

  setAttributes(attributes: CMAttribute[]) {
    this.attributes = attributes;
  }

  getAttributes(): CMAttribute[] {
    return this.attributes;
  }

  setRequirements(requirements: CMRequirement[]) {
    this.requirements = [];
    this.requirements = requirements;
  }

  getRequirements(): CMRequirement[] {
    return this.requirements;
  }

  getCustomRequirements(): CMRequirement[] {
    this.customRequirements = [];
    this.requirements.forEach((requirement) => {
        if (requirement.name.includes('CUS')) {
        this.customRequirements.push(requirement);
    }});

    return this.customRequirements;
  }

  setEnhancements(enhancements: CMExtensionKey[]) {
    this.enhancements = [];
    this.enhancements = enhancements;
  }

  getEnhancements(): CMExtensionKey[] {
    return this.enhancements;
  }

  setStatus(status: CMExtensionKey[]) {
    this.status = status;
  }

  getStatus(): CMExtensionKey[] {
    return this.status;
  }

  setCategories(categories: CMAttribute[]) {
    this.categories = categories;
  }

  getCategories(): CMAttribute[] {
    return this.categories;
  }

  setCategoriesInList(categoriesInList: number[]) {
    this.categoriesInList  = categoriesInList;
  }

  getCategoriesInList(): number[] {
    return this.categoriesInList;
  }

}
