import { BaseEntity } from './../../shared';

export class SkAtEx implements BaseEntity {
    constructor(
        public id?: number,
        public skeleton?: BaseEntity,
        public attribute?: BaseEntity,
        public extension?: BaseEntity,
    ) {
    }
}
