import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { RequirementSet } from '../'; // this references to the index.ts Barrel

type ServiceResponseType = HttpResponse<RequirementSet>;

@Injectable()
export class CaseManagementBackendService {

    private resourceUrl = SERVER_API_URL + 'caseManagement/api';

    constructor(private httpClient: HttpClient) { }

    getRequirements(): Observable<HttpResponse<RequirementSet[]>> {
        const requestUrl = this.resourceUrl + '/requirementSets';
        return this.httpClient.get(requestUrl).map((res: HttpResponse<RequirementSet[]>) => this.convertResponseArrayToType(res));
    }

    convertResponseArrayToType<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
        const jsonResponse: T[] = res.body;
        const body: T[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            const item: T = Object.assign({}, jsonResponse[i]);
            body.push(item);
        }
        return res.clone({ body });
    }
}
