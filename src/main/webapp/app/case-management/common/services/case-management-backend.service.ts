import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';
import {
    CMRequirementSet,
    CMAttributeKey,
    CMAttribute,
    CMAttributeType
} from '../'; // this references to the index.ts Barrel
// import * as attributeKeys from '../../attributes-keys.mock.json';
// import * as attributes from '../../attributes.mock.json';

type RequirementSetResponseType = HttpResponse<CMRequirementSet[]>;

@Injectable()
export class CaseManagementBackendService {

    private resourceUrl = SERVER_API_URL + 'caseManagement/api';

    constructor(private httpClient: HttpClient) { }

    /**
     * Fetch all active requirement sets.
     */
    getRequirementSets(): Observable<RequirementSetResponseType> {
        const requestUrl = this.resourceUrl + '/requirementSets';
        return this.httpClient.get<CMRequirementSet[]>(requestUrl, { observe: 'response' }).map((res: RequirementSetResponseType) => {
            return this.convertResponseArrayToType(res);
        });
    }

    /**
     * Fetches active attribute keys according to the query parameters provided.
     * @param requirementSetId The requirement set identifier link to the attribute keys
     * @param attributeKeyType The type of the attribute key
     */
    getAttributeKeys(requirementSetId: number, attributeKeyType?: CMAttributeType): Observable<HttpResponse<CMAttributeKey[]>> {
        const requestUrl = this.resourceUrl + '/attributeKeys';
        const options = createRequestOption({
            requirementSet: requirementSetId,
            type: attributeKeyType
        });
        return this.httpClient.get<CMAttributeKey[]>(requestUrl, { params: options, observe: 'response' }).map(
            (res: HttpResponse<CMAttributeKey[]>) => this.convertResponseArrayToType(res));
    }

    /**
     * Fetches active attributes according to the query parameters provided.
     * @param requirementSetId The requirement set identifier link to the attribute keys
     * @param attributeKeyType The type of the attribute key
     */
    getAttributes(requirementSetId: number, attributeKeyType?: CMAttributeType): Observable<HttpResponse<CMAttribute[]>> {
        const requestUrl = this.resourceUrl + '/attributes';
        const options = createRequestOption({
            requirementSet: requirementSetId,
            type: attributeKeyType
        });
        return this.httpClient.get<CMAttribute[]>(requestUrl, { params: options, observe: 'response' }).map(
            (res: HttpResponse<CMAttribute[]>) => this.convertResponseArrayToType(res));
    }

    // getMockAttributeKeys(): CMAttributeKey[] {
    //     const mockAttributeKeys: CMAttributeKey[] = [];
    //     (<any>attributeKeys).forEach((element) => {
    //         mockAttributeKeys.push(new CMAttributeKey(
    //             element.id,
    //             element.name,
    //             element.showOrder,
    //             element.description
    //         ));
    //     });
    //     return mockAttributeKeys;
    // }

    // getMockAttributes(): CMAttribute[] {
    //     const mockAttributes: CMAttribute[] = [];
    //     (<any>attributes).forEach((element) => {
    //         mockAttributes.push(new CMAttribute(
    //             element.id,
    //             element.name,
    //             element.showOrder,
    //             element.keyId,
    //             element.description,
    //             element.children
    //         ));
    //     });
    //     return mockAttributes;
    // }

    /**
     * Converts the HTTP response to the appropriate type.
     * @param res The @link{HttpResponse} object
     */
    convertResponseArrayToType<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
        const jsonResponse: T[] = res.body;
        const body: T[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            const item: T = Object.assign({}, jsonResponse[i]);
            body.push(item);
        }
        return res.clone({ body });
    }
}
