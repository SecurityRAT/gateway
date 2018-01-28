import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ExtensionKey } from './extension-key.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExtensionKeyService {

    private resourceUrl =  SERVER_API_URL + '/requirementManagement/api/extension-keys';

    constructor(private http: Http) { }

    create(extensionKey: ExtensionKey): Observable<ExtensionKey> {
        const copy = this.convert(extensionKey);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(extensionKey: ExtensionKey): Observable<ExtensionKey> {
        const copy = this.convert(extensionKey);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ExtensionKey> {
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
     * Convert a returned JSON object to ExtensionKey.
     */
    private convertItemFromServer(json: any): ExtensionKey {
        const entity: ExtensionKey = Object.assign(new ExtensionKey(), json);
        return entity;
    }

    /**
     * Convert a ExtensionKey to a JSON which can be sent to the server.
     */
    private convert(extensionKey: ExtensionKey): ExtensionKey {
        const copy: ExtensionKey = Object.assign({}, extensionKey);
        return copy;
    }
}
