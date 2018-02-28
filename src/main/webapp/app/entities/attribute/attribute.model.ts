import { BaseEntity } from './../../shared';

export class Attribute implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public showOrder?: number,
        public active?: boolean,
        public skAtExes?: BaseEntity[],
        public parent?: BaseEntity,
        public attributeKey?: BaseEntity,
    ) {
        this.active = false;
    }
}
