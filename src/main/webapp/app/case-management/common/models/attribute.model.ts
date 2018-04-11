import { BaseDomain } from '../';

export class CMAttribute implements BaseDomain {
    constructor(
        public id: number,
        public name: String,
        public showOrder: number,
        public keyId?: number,
        public description?: String,
        public children?: CMAttribute[],
        public selected?: boolean
    ) {
    }
}
