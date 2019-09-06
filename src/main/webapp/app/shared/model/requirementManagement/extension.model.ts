import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

export interface IExtension {
  id?: number;
  content?: any;
  description?: any;
  showOrder?: number;
  active?: boolean;
  skAtExes?: ISkAtEx[];
  extensionKey?: IExtensionKey;
}

export class Extension implements IExtension {
  constructor(
    public id?: number,
    public content?: any,
    public description?: any,
    public showOrder?: number,
    public active?: boolean,
    public skAtExes?: ISkAtEx[],
    public extensionKey?: IExtensionKey
  ) {
    this.active = this.active || false;
  }
}
