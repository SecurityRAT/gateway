import { BaseDomain } from '../';

export class CMAttribute implements BaseDomain {
  constructor(
    public id: number,
    public name: string,
    public showOrder: number,
    public values?: CMAttribute[],
    public description?: string,
    public children?: CMAttribute[],
    public selected?: boolean
  ) {
    this.selected = false;
  }
}
