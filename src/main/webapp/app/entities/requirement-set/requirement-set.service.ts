import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RequirementSet } from './requirement-set.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RequirementSet>;

@Injectable()
export class RequirementSetService {

    private resourceUrl =  SERVER_API_URL + 'requirementManagement/api/requirement-sets';

    constructor(private http: HttpClient) { }

    create(requirementSet: RequirementSet): Observable<EntityResponseType> {
        const copy = this.convert(requirementSet);
        return this.http.post<RequirementSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(requirementSet: RequirementSet): Observable<EntityResponseType> {
        const copy = this.convert(requirementSet);
        return this.http.put<RequirementSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RequirementSet>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RequirementSet[]>> {
        const options = createRequestOption(req);
        return this.http.get<RequirementSet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RequirementSet[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RequirementSet = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RequirementSet[]>): HttpResponse<RequirementSet[]> {
        const jsonResponse: RequirementSet[] = res.body;
        const body: RequirementSet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RequirementSet.
     */
    private convertItemFromServer(requirementSet: RequirementSet): RequirementSet {
        const copy: RequirementSet = Object.assign({}, requirementSet);
        return copy;
    }

    /**
     * Convert a RequirementSet to a JSON which can be sent to the server.
     */
    private convert(requirementSet: RequirementSet): RequirementSet {
        const copy: RequirementSet = Object.assign({}, requirementSet);
        return copy;
    }
}
