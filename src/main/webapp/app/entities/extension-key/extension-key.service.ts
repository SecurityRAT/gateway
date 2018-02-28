import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ExtensionKey } from './extension-key.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExtensionKey>;

@Injectable()
export class ExtensionKeyService {

    private resourceUrl =  SERVER_API_URL + 'requirementmanagement/api/extension-keys';

    constructor(private http: HttpClient) { }

    create(extensionKey: ExtensionKey): Observable<EntityResponseType> {
        const copy = this.convert(extensionKey);
        return this.http.post<ExtensionKey>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(extensionKey: ExtensionKey): Observable<EntityResponseType> {
        const copy = this.convert(extensionKey);
        return this.http.put<ExtensionKey>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExtensionKey>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExtensionKey[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExtensionKey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExtensionKey[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExtensionKey = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExtensionKey[]>): HttpResponse<ExtensionKey[]> {
        const jsonResponse: ExtensionKey[] = res.body;
        const body: ExtensionKey[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExtensionKey.
     */
    private convertItemFromServer(extensionKey: ExtensionKey): ExtensionKey {
        const copy: ExtensionKey = Object.assign({}, extensionKey);
        return copy;
    }

    /**
     * Convert a ExtensionKey to a JSON which can be sent to the server.
     */
    private convert(extensionKey: ExtensionKey): ExtensionKey {
        const copy: ExtensionKey = Object.assign({}, extensionKey);
        return copy;
    }
}
