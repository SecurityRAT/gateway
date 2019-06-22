import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';
import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

export interface IRequirementSet {
  id?: number;
  name?: string;
  description?: any;
  showOrder?: number;
  active?: boolean;
  attributeKeys?: IAttributeKey[];
  skeletons?: ISkeleton[];
  extensionKeys?: IExtensionKey[];
}

export class RequirementSet implements IRequirementSet {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public showOrder?: number,
    public active?: boolean,
    public attributeKeys?: IAttributeKey[],
    public skeletons?: ISkeleton[],
    public extensionKeys?: IExtensionKey[]
  ) {
    this.active = this.active || false;
  }
}
