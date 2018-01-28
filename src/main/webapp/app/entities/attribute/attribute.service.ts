import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Attribute } from './attribute.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AttributeService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/attributes';

    constructor(private http: Http) { }

    create(attribute: Attribute): Observable<Attribute> {
        const copy = this.convert(attribute);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(attribute: Attribute): Observable<Attribute> {
        const copy = this.convert(attribute);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Attribute> {
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
     * Convert a returned JSON object to Attribute.
     */
    private convertItemFromServer(json: any): Attribute {
        const entity: Attribute = Object.assign(new Attribute(), json);
        return entity;
    }

    /**
     * Convert a Attribute to a JSON which can be sent to the server.
     */
    private convert(attribute: Attribute): Attribute {
        const copy: Attribute = Object.assign({}, attribute);
        return copy;
    }
}
