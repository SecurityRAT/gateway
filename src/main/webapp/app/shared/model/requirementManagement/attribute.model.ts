import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

export interface IAttribute {
  id?: number;
  name?: string;
  description?: any;
  showOrder?: number;
  active?: boolean;
  skAtExes?: ISkAtEx[];
  parent?: IAttribute;
  attributeKey?: IAttributeKey;
}

export class Attribute implements IAttribute {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public showOrder?: number,
    public active?: boolean,
    public skAtExes?: ISkAtEx[],
    public parent?: IAttribute,
    public attributeKey?: IAttributeKey
  ) {
    this.active = this.active || false;
  }
}
