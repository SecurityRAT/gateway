import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

type EntityResponseType = HttpResponse<IRequirementSet>;
type EntityArrayResponseType = HttpResponse<IRequirementSet[]>;

@Injectable({ providedIn: 'root' })
export class RequirementSetService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/requirement-sets';

  constructor(protected http: HttpClient) {}

  create(requirementSet: IRequirementSet): Observable<EntityResponseType> {
    return this.http.post<IRequirementSet>(this.resourceUrl, requirementSet, { observe: 'response' });
  }

  update(requirementSet: IRequirementSet): Observable<EntityResponseType> {
    return this.http.put<IRequirementSet>(this.resourceUrl, requirementSet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRequirementSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRequirementSet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
