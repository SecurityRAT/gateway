import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AttributeKey } from './attribute-key.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AttributeKeyService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/attribute-keys';

    constructor(private http: Http) { }

    create(attributeKey: AttributeKey): Observable<AttributeKey> {
        const copy = this.convert(attributeKey);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(attributeKey: AttributeKey): Observable<AttributeKey> {
        const copy = this.convert(attributeKey);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AttributeKey> {
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
     * Convert a returned JSON object to AttributeKey.
     */
    private convertItemFromServer(json: any): AttributeKey {
        const entity: AttributeKey = Object.assign(new AttributeKey(), json);
        return entity;
    }

    /**
     * Convert a AttributeKey to a JSON which can be sent to the server.
     */
    private convert(attributeKey: AttributeKey): AttributeKey {
        const copy: AttributeKey = Object.assign({}, attributeKey);
        return copy;
    }
}
