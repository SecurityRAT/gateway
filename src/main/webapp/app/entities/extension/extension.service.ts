import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Extension } from './extension.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Extension>;

@Injectable()
export class ExtensionService {

    private resourceUrl =  SERVER_API_URL + 'requirementManagement/api/extensions';

    constructor(private http: HttpClient) { }

    create(extension: Extension): Observable<EntityResponseType> {
        const copy = this.convert(extension);
        return this.http.post<Extension>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(extension: Extension): Observable<EntityResponseType> {
        const copy = this.convert(extension);
        return this.http.put<Extension>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Extension>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Extension[]>> {
        const options = createRequestOption(req);
        return this.http.get<Extension[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Extension[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Extension = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Extension[]>): HttpResponse<Extension[]> {
        const jsonResponse: Extension[] = res.body;
        const body: Extension[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Extension.
     */
    private convertItemFromServer(extension: Extension): Extension {
        const copy: Extension = Object.assign({}, extension);
        return copy;
    }

    /**
     * Convert a Extension to a JSON which can be sent to the server.
     */
    private convert(extension: Extension): Extension {
        const copy: Extension = Object.assign({}, extension);
        return copy;
    }
}
