import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Skeleton } from './skeleton.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Skeleton>;

@Injectable()
export class SkeletonService {

    private resourceUrl =  SERVER_API_URL + 'requirementManagement/api/skeletons';

    constructor(private http: HttpClient) { }

    create(skeleton: Skeleton): Observable<EntityResponseType> {
        const copy = this.convert(skeleton);
        return this.http.post<Skeleton>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(skeleton: Skeleton): Observable<EntityResponseType> {
        const copy = this.convert(skeleton);
        return this.http.put<Skeleton>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Skeleton>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Skeleton[]>> {
        const options = createRequestOption(req);
        return this.http.get<Skeleton[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Skeleton[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Skeleton = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Skeleton[]>): HttpResponse<Skeleton[]> {
        const jsonResponse: Skeleton[] = res.body;
        const body: Skeleton[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Skeleton.
     */
    private convertItemFromServer(skeleton: Skeleton): Skeleton {
        const copy: Skeleton = Object.assign({}, skeleton);
        return copy;
    }

    /**
     * Convert a Skeleton to a JSON which can be sent to the server.
     */
    private convert(skeleton: Skeleton): Skeleton {
        const copy: Skeleton = Object.assign({}, skeleton);
        return copy;
    }
}
