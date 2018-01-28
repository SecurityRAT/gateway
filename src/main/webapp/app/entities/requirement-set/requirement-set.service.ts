import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RequirementSet } from './requirement-set.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RequirementSetService {

    private resourceUrl =  SERVER_API_URL + '/requirementmanagement/api/requirement-sets';

    constructor(private http: Http) { }

    create(requirementSet: RequirementSet): Observable<RequirementSet> {
        const copy = this.convert(requirementSet);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(requirementSet: RequirementSet): Observable<RequirementSet> {
        const copy = this.convert(requirementSet);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RequirementSet> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to RequirementSet.
     */
    private convertItemFromServer(json: any): RequirementSet {
        const entity: RequirementSet = Object.assign(new RequirementSet(), json);
        return entity;
    }

    /**
     * Convert a RequirementSet to a JSON which can be sent to the server.
     */
    private convert(requirementSet: RequirementSet): RequirementSet {
        const copy: RequirementSet = Object.assign({}, requirementSet);
        return copy;
    }
}
