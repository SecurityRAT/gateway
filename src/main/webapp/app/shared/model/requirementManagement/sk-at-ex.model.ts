import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';
import { IAttribute } from 'app/shared/model/requirementManagement/attribute.model';
import { IExtension } from 'app/shared/model/requirementManagement/extension.model';

export interface ISkAtEx {
  id?: number;
  skeleton?: ISkeleton;
  attribute?: IAttribute;
  extension?: IExtension;
}

export class SkAtEx implements ISkAtEx {
  constructor(public id?: number, public skeleton?: ISkeleton, public attribute?: IAttribute, public extension?: IExtension) {}
}
