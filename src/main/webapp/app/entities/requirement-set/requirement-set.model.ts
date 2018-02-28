import { BaseEntity } from './../../shared';

export class RequirementSet implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public showOrder?: number,
        public active?: boolean,
        public attributeKeys?: BaseEntity[],
        public skeletons?: BaseEntity[],
        public extensionKeys?: BaseEntity[],
    ) {
        this.active = false;
    }
}
