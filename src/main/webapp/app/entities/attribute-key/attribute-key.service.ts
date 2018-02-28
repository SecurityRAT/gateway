import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AttributeKey } from './attribute-key.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AttributeKey>;

@Injectable()
export class AttributeKeyService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/attribute-keys';

    constructor(private http: HttpClient) { }

    create(attributeKey: AttributeKey): Observable<EntityResponseType> {
        const copy = this.convert(attributeKey);
        return this.http.post<AttributeKey>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(attributeKey: AttributeKey): Observable<EntityResponseType> {
        const copy = this.convert(attributeKey);
        return this.http.put<AttributeKey>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AttributeKey>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AttributeKey[]>> {
        const options = createRequestOption(req);
        return this.http.get<AttributeKey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AttributeKey[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AttributeKey = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AttributeKey[]>): HttpResponse<AttributeKey[]> {
        const jsonResponse: AttributeKey[] = res.body;
        const body: AttributeKey[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AttributeKey.
     */
    private convertItemFromServer(attributeKey: AttributeKey): AttributeKey {
        const copy: AttributeKey = Object.assign({}, attributeKey);
        return copy;
    }

    /**
     * Convert a AttributeKey to a JSON which can be sent to the server.
     */
    private convert(attributeKey: AttributeKey): AttributeKey {
        const copy: AttributeKey = Object.assign({}, attributeKey);
        return copy;
    }
}
