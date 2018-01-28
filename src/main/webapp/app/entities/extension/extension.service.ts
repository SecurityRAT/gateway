import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Extension } from './extension.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExtensionService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/extensions';

    constructor(private http: Http) { }

    create(extension: Extension): Observable<Extension> {
        const copy = this.convert(extension);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(extension: Extension): Observable<Extension> {
        const copy = this.convert(extension);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Extension> {
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
     * Convert a returned JSON object to Extension.
     */
    private convertItemFromServer(json: any): Extension {
        const entity: Extension = Object.assign(new Extension(), json);
        return entity;
    }

    /**
     * Convert a Extension to a JSON which can be sent to the server.
     */
    private convert(extension: Extension): Extension {
        const copy: Extension = Object.assign({}, extension);
        return copy;
    }
}
