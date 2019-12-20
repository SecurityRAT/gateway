import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';

type EntityResponseType = HttpResponse<ISkAtEx>;
type EntityArrayResponseType = HttpResponse<ISkAtEx[]>;

@Injectable({ providedIn: 'root' })
export class SkAtExService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/sk-at-exes';

  constructor(protected http: HttpClient) {}

  create(skAtEx: ISkAtEx): Observable<EntityResponseType> {
    return this.http.post<ISkAtEx>(this.resourceUrl, skAtEx, { observe: 'response' });
  }

  update(skAtEx: ISkAtEx): Observable<EntityResponseType> {
    return this.http.put<ISkAtEx>(this.resourceUrl, skAtEx, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkAtEx>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkAtEx[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
