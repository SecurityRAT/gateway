import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SkAtEx } from './sk-at-ex.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SkAtEx>;

@Injectable()
export class SkAtExService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/sk-at-exes';

    constructor(private http: HttpClient) { }

    create(skAtEx: SkAtEx): Observable<EntityResponseType> {
        const copy = this.convert(skAtEx);
        return this.http.post<SkAtEx>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(skAtEx: SkAtEx): Observable<EntityResponseType> {
        const copy = this.convert(skAtEx);
        return this.http.put<SkAtEx>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SkAtEx>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SkAtEx[]>> {
        const options = createRequestOption(req);
        return this.http.get<SkAtEx[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SkAtEx[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SkAtEx = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SkAtEx[]>): HttpResponse<SkAtEx[]> {
        const jsonResponse: SkAtEx[] = res.body;
        const body: SkAtEx[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SkAtEx.
     */
    private convertItemFromServer(skAtEx: SkAtEx): SkAtEx {
        const copy: SkAtEx = Object.assign({}, skAtEx);
        return copy;
    }

    /**
     * Convert a SkAtEx to a JSON which can be sent to the server.
     */
    private convert(skAtEx: SkAtEx): SkAtEx {
        const copy: SkAtEx = Object.assign({}, skAtEx);
        return copy;
    }
}
