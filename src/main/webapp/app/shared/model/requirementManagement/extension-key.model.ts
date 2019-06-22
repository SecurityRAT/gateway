import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

export const enum ExtensionSection {
  STATUS = 'STATUS',
  ENHANCEMENT = 'ENHANCEMENT'
}

export const enum ExtensionType {
  ENUM = 'ENUM',
  FREETEXT = 'FREETEXT'
}

export interface IExtensionKey {
  id?: number;
  name?: string;
  description?: any;
  section?: ExtensionSection;
  type?: ExtensionType;
  showOrder?: number;
  active?: boolean;
  extensions?: IExtension[];
  requirementSet?: IRequirementSet;
}

export class ExtensionKey implements IExtensionKey {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public section?: ExtensionSection,
    public type?: ExtensionType,
    public showOrder?: number,
    public active?: boolean,
    public extensions?: IExtension[],
    public requirementSet?: IRequirementSet
  ) {
    this.active = this.active || false;
  }
}
