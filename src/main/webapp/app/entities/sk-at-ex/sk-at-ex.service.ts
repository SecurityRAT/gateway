import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SkAtEx } from './sk-at-ex.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SkAtExService {

    private resourceUrl =  SERVER_API_URL + '/requirementmanagement/api/sk-at-exes';

    constructor(private http: Http) { }

    create(skAtEx: SkAtEx): Observable<SkAtEx> {
        const copy = this.convert(skAtEx);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(skAtEx: SkAtEx): Observable<SkAtEx> {
        const copy = this.convert(skAtEx);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SkAtEx> {
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
     * Convert a returned JSON object to SkAtEx.
     */
    private convertItemFromServer(json: any): SkAtEx {
        const entity: SkAtEx = Object.assign(new SkAtEx(), json);
        return entity;
    }

    /**
     * Convert a SkAtEx to a JSON which can be sent to the server.
     */
    private convert(skAtEx: SkAtEx): SkAtEx {
        const copy: SkAtEx = Object.assign({}, skAtEx);
        return copy;
    }
}
