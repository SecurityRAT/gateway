import { BaseEntity } from './../../shared';

export class Extension implements BaseEntity {
    constructor(
        public id?: number,
        public content?: any,
        public description?: any,
        public showOrder?: number,
        public active?: boolean,
        public skAtExes?: BaseEntity[],
        public extensionKey?: BaseEntity,
    ) {
        this.active = false;
    }
}
