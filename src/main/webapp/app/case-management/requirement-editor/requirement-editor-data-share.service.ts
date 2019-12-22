import { Injectable, OnInit } from '@angular/core';
import { CMRequirement, CMExtensionKey, CMAttribute } from '../common/';

@Injectable()
export class RequirementEditorDataShareService implements OnInit {
  requirements: CMRequirement[];
  customRequirements: CMRequirement[];
  enhancements: CMExtensionKey[];
  attributes: CMAttribute[];
  status: CMExtensionKey[];
  categories: CMAttribute[];
  categoriesInList: number[];

  constructor() {
    this.requirements = [];
    this.customRequirements = [];
    this.enhancements = [];
    this.attributes = [];
    this.status = [];
    this.categories = [];
    this.categoriesInList = [];
  }

  ngOnInit(): void {}

  setAttributes(attributes: CMAttribute[]): void {
    this.attributes = attributes;
  }

  getAttributes(): CMAttribute[] {
    return this.attributes;
  }

  setRequirements(requirements: CMRequirement[]): void {
    this.requirements = [];
    this.requirements = requirements;
  }

  getRequirements(): CMRequirement[] {
    return this.requirements;
  }

  getCustomRequirements(): CMRequirement[] {
    this.customRequirements = [];
    this.requirements.forEach(requirement => {
      if (requirement.name.includes('CUS')) {
        this.customRequirements.push(requirement);
      }
    });

    return this.customRequirements;
  }

  setEnhancements(enhancements: CMExtensionKey[]): void {
    this.enhancements = [];
    this.enhancements = enhancements;
  }

  getEnhancements(): CMExtensionKey[] {
    return this.enhancements;
  }

  setStatus(status: CMExtensionKey[]): void {
    this.status = status;
  }

  getStatus(): CMExtensionKey[] {
    return this.status;
  }

  setCategories(categories: CMAttribute[]): void {
    this.categories = categories;
  }

  getCategories(): CMAttribute[] {
    return this.categories;
  }

  setCategoriesInList(categoriesInList: number[]): void {
    this.categoriesInList = categoriesInList;
  }

  getCategoriesInList(): number[] {
    return this.categoriesInList;
  }
}
