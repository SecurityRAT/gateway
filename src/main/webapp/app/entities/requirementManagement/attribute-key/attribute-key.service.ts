import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

type EntityResponseType = HttpResponse<IAttributeKey>;
type EntityArrayResponseType = HttpResponse<IAttributeKey[]>;

@Injectable({ providedIn: 'root' })
export class AttributeKeyService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/attribute-keys';

  constructor(protected http: HttpClient) {}

  create(attributeKey: IAttributeKey): Observable<EntityResponseType> {
    return this.http.post<IAttributeKey>(this.resourceUrl, attributeKey, { observe: 'response' });
  }

  update(attributeKey: IAttributeKey): Observable<EntityResponseType> {
    return this.http.put<IAttributeKey>(this.resourceUrl, attributeKey, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAttributeKey>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributeKey[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
