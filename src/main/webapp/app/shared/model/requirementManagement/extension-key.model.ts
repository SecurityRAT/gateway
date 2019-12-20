import { IExtension } from 'app/shared/model/requirementManagement/extension.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { ExtensionSection } from 'app/shared/model/enumerations/extension-section.model';
import { ExtensionType } from 'app/shared/model/enumerations/extension-type.model';

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
