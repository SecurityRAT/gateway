import { BaseEntity } from './../../shared';

export class Skeleton implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public showOrder?: number,
        public active?: boolean,
        public skAtExes?: BaseEntity[],
        public requirementSet?: BaseEntity,
    ) {
        this.active = false;
    }
}
