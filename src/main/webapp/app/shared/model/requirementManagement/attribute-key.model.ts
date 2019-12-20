import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';
import { AttributeType } from 'app/shared/model/enumerations/attribute-type.model';

export interface IAttributeKey {
  id?: number;
  name?: string;
  description?: any;
  type?: AttributeType;
  showOrder?: number;
  active?: boolean;
  attributes?: IAttribute[];
  requirementSet?: IRequirementSet;
}

export class AttributeKey implements IAttributeKey {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public type?: AttributeType,
    public showOrder?: number,
    public active?: boolean,
    public attributes?: IAttribute[],
    public requirementSet?: IRequirementSet
  ) {
    this.active = this.active || false;
  }
}
