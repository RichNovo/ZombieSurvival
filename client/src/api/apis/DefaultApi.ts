/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateSurvivorRequest,
  HTTPValidationError,
  Survivor,
  SurvivorListReply,
} from '../models/index';
import {
    CreateSurvivorRequestFromJSON,
    CreateSurvivorRequestToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    SurvivorFromJSON,
    SurvivorToJSON,
    SurvivorListReplyFromJSON,
    SurvivorListReplyToJSON,
} from '../models/index';

export interface CreateSurvivorSurvivorsPostRequest {
    createSurvivorRequest: CreateSurvivorRequest;
}

export interface UpdateSurvivorSurvivorsPutRequest {
    id: number;
    longitude: number;
    latitude: number;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Create Survivor
     */
    async createSurvivorSurvivorsPostRaw(requestParameters: CreateSurvivorSurvivorsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['createSurvivorRequest'] == null) {
            throw new runtime.RequiredError(
                'createSurvivorRequest',
                'Required parameter "createSurvivorRequest" was null or undefined when calling createSurvivorSurvivorsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/survivors/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSurvivorRequestToJSON(requestParameters['createSurvivorRequest']),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Create Survivor
     */
    async createSurvivorSurvivorsPost(requestParameters: CreateSurvivorSurvivorsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.createSurvivorSurvivorsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Survivors
     */
    async getSurvivorsSurvivorsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SurvivorListReply>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/survivors/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SurvivorListReplyFromJSON(jsonValue));
    }

    /**
     * Get Survivors
     */
    async getSurvivorsSurvivorsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SurvivorListReply> {
        const response = await this.getSurvivorsSurvivorsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Update Survivor
     */
    async updateSurvivorSurvivorsPutRaw(requestParameters: UpdateSurvivorSurvivorsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Survivor>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateSurvivorSurvivorsPut().'
            );
        }

        if (requestParameters['longitude'] == null) {
            throw new runtime.RequiredError(
                'longitude',
                'Required parameter "longitude" was null or undefined when calling updateSurvivorSurvivorsPut().'
            );
        }

        if (requestParameters['latitude'] == null) {
            throw new runtime.RequiredError(
                'latitude',
                'Required parameter "latitude" was null or undefined when calling updateSurvivorSurvivorsPut().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['id'] != null) {
            queryParameters['id'] = requestParameters['id'];
        }

        if (requestParameters['longitude'] != null) {
            queryParameters['longitude'] = requestParameters['longitude'];
        }

        if (requestParameters['latitude'] != null) {
            queryParameters['latitude'] = requestParameters['latitude'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/survivors/`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SurvivorFromJSON(jsonValue));
    }

    /**
     * Update Survivor
     */
    async updateSurvivorSurvivorsPut(requestParameters: UpdateSurvivorSurvivorsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Survivor> {
        const response = await this.updateSurvivorSurvivorsPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
