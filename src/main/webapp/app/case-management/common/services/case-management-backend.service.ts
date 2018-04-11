import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';
import {
    CMRequirementSet,
    CMAttributeKey,
    CMAttribute,
    CMAttributeType,
    CMRequirement,
    CMExtensionKey,
    STATUS_URI,
    ATTRIBUTE_URI,
    ATTRIBUTES_URI,
    ATTRIBUTEKEY_URI,
    ATTRIBUTEKEYS_URI,
    REQUIREMENTSET_URI,
    REQUIREMENTS_URI,
    ENHANCEMENTS_URI
} from '../'; // this references to the index.ts Barrel
import * as attributeKeys from '../../attributes-keys.mock.json';
import * as attributes from '../../attributes.mock.json';
import * as requirements from '../../requirements.mock.json';
import * as enhancements from '../../enhancements.mock.json';
import * as status from '../../status.mock.json';

type RequirementSetResponseType = HttpResponse<CMRequirementSet[]>;
type Type = Function;

@Injectable()
export class CaseManagementBackendService {

    private resourceUrl = SERVER_API_URL + 'caseManagement/api';

    constructor(private httpClient: HttpClient) { }

    query<T>(c: Type, uri: string, params?: Object, headers?: HttpHeaders): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(params);
        return this.httpClient.get<T[]>(`${this.resourceUrl}${uri}`, { params: options, headers, observe: 'response' }).map((res: HttpResponse<T[]>) => {
            return this.convertResponseArrayToType(res);
        });
    }

    /**
     * Fetch all active requirement sets.
     */
    getRequirementSets(ids?: number[]): Observable<RequirementSetResponseType> {
        let uri = REQUIREMENTSET_URI;
        let options;

        if (ids) {
            uri = REQUIREMENTSET_URI;
            options = {
                id: ids
            };
        }
        return this.query(CMRequirementSet, uri, options);
    }

    /**
     * Fetches active attribute keys according to the query parameters provided.
     * @param requirementSet The requirement set identifier link to the attribute keys
     * @param type The type of the attribute key
     */
    findAttributeKeys(requirementSet: number, type?: CMAttributeType): Observable<HttpResponse<CMAttributeKey[]>> {
        const params = {
            requirementSet,
            type
        };
        return this.query(CMAttributeKey, ATTRIBUTEKEYS_URI, params);
        // return Observable.of(this.convertResponseArrayToType(new HttpResponse({
        //     body: this.getMockAttributeKeys()
        // })));
    }

    /**
     * Fetch the attribute keys with the given ids
     * @param ids the list of the attribute key ids
     */
    getAttributeKeys(ids: number[]): Observable<HttpResponse<CMAttribute[]>> {
        const params = {
            id: ids
        };
        return this.query(CMAttributeKey, ATTRIBUTEKEY_URI, params);
    }

    /**
     * Fetches active attributes according to the query parameters provided.
     * @param requirementSet The requirement set identifier link to the attribute keys
     * @param type The type of the attribute key
     */
    findAttributes(requirementSet: number, type?: CMAttributeType): Observable<HttpResponse<CMAttribute[]>> {
        const options = {
            requirementSet,
            type
        };
        return this.query(CMAttribute, ATTRIBUTES_URI, options);
        // return Observable.of(this.convertResponseArrayToType(new HttpResponse({
        //     body: this.getMockAttributes()
        // })));
    }

    /**
     * Fetch the attributes with the given ids
     * @param ids the list of the attribute ids
     */
    getAttributes(ids: number[]): Observable<HttpResponse<CMAttribute[]>> {
        const options = {
            id: ids
        };
        return this.query(CMAttribute, ATTRIBUTE_URI, options);
    }

    findEnhancements(requirementSet: number): Observable<HttpResponse<CMExtensionKey[]>> {
        return this.query(CMExtensionKey, ENHANCEMENTS_URI, { requirementSet });
        // return Observable.of(this.convertResponseArrayToType(new HttpResponse({
        //     body: this.getMockEnhancements()
        // })));
    }

    findStatus(requirementSet: number): Observable<HttpResponse<CMExtensionKey[]>> {
        return this.query(CMExtensionKey, STATUS_URI, { requirementSet });
        // return Observable.of(this.convertResponseArrayToType(new HttpResponse({
        //     body: this.getMockStatus()
        // })));
    }

    /**
     * Fetch requirements according to the given parameters.
     * @param requirementSet the requirement set id
     * @param attributeIds the list of attribute ids
     */
    fetchRequirements(requirementSet: number, attributeIds: number[]): Observable<HttpResponse<CMRequirement[]>> {
        const options = {
            requirementSet,
            attributeIds
        };
        return this.query(CMRequirement, REQUIREMENTS_URI, options);
        // return Observable.of(this.convertResponseArrayToType(new HttpResponse({
        //     body: this.getMockRequirements()
        // })));
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
    // getMockRequirements(): CMRequirement[] {
    //     const mockRequirements: CMRequirement[] = [];
    //     (<any>requirements).forEach((element) => {
    //         mockRequirements.push(new CMRequirement(
    //             element.id,
    //             element.name,
    //             element.categoryId,
    //             element.showOrder,
    //             element.feTags,
    //             element.parameters,
    //             element.enhancements,
    //             element.status,
    //             element.description,
    //         ));
    //     });
    //     return mockRequirements;
    // }

    // getMockEnhancements(): CMExtensionKey[] {
    //     const mockEnhancements: CMExtensionKey[] = [];
    //     (<any>enhancements).forEach((element) => {
    //         mockEnhancements.push(new CMExtensionKey(
    //             element.id,
    //             element.name,
    //             element.description,
    //             element.showOrder
    //         ));
    //     });
    //     return mockEnhancements;
    // }
    // getMockStatus(): CMExtensionKey[] {
    //     const mockStatus: CMExtensionKey[] = [];
    //     (<any>status).forEach((element) => {
    //         mockStatus.push(new CMExtensionKey(
    //             element.id,
    //             element.name,
    //             element.description,
    //             element.showOrder,
    //             element.type,
    //             element.values
    //         ));
    //     });
    //     return mockStatus;
    // }

    private convertItemFromServer<T>(item: T): T {
        const copy: T = Object.assign({}, item);
        return copy;
    }

    /**
     * Converts the HTTP response to the appropriate type.
     * @param res The @link{HttpResponse} object
     */
    convertResponseArrayToType<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
        const jsonResponse: T[] = res.body;
        const body: T[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            const item: T = Object.assign({}, this.convertItemFromServer(jsonResponse[i]));
            body.push(item);
        }
        return res.clone({ body });
    }
}
