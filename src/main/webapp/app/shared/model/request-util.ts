import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    const arrayTypeQueryParams: String[] = [
        'sort',
        'attributeIds',
        'ids'
    ];

    if (req) {
        Object.keys(req).forEach((key) => {
            if (!arrayTypeQueryParams.includes(key)) {
                options = options.set(key, req[key]);
            } else {
                // creates a query parameter with a list of values for arrays.
                if (req[key]) {
                    req[key].forEach((val) => {
                        options = options.append(key, val);
                    });
                }
            }
        });
    }
    return options;
};
