import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISkeleton } from 'app/shared/model/requirementManagement/skeleton.model';

type EntityResponseType = HttpResponse<ISkeleton>;
type EntityArrayResponseType = HttpResponse<ISkeleton[]>;

@Injectable({ providedIn: 'root' })
export class SkeletonService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/skeletons';

  constructor(protected http: HttpClient) {}

  create(skeleton: ISkeleton): Observable<EntityResponseType> {
    return this.http.post<ISkeleton>(this.resourceUrl, skeleton, { observe: 'response' });
  }

  update(skeleton: ISkeleton): Observable<EntityResponseType> {
    return this.http.put<ISkeleton>(this.resourceUrl, skeleton, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkeleton>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkeleton[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
