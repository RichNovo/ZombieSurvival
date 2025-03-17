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

import { mapValues } from "../runtime";
/**
 *
 * @export
 * @interface Survivor
 */
export interface Survivor {
  /**
   *
   * @type {number}
   * @memberof Survivor
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Survivor
   */
  name: string;
  /**
   *
   * @type {number}
   * @memberof Survivor
   */
  age: number;
  /**
   *
   * @type {string}
   * @memberof Survivor
   */
  gender: string;
  /**
   *
   * @type {number}
   * @memberof Survivor
   */
  latitude: number;
  /**
   *
   * @type {number}
   * @memberof Survivor
   */
  longitude: number;
}

/**
 * Check if a given object implements the Survivor interface.
 */
export function instanceOfSurvivor(value: object): value is Survivor {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("name" in value) || value["name"] === undefined) return false;
  if (!("age" in value) || value["age"] === undefined) return false;
  if (!("gender" in value) || value["gender"] === undefined) return false;
  if (!("latitude" in value) || value["latitude"] === undefined) return false;
  if (!("longitude" in value) || value["longitude"] === undefined) return false;
  return true;
}

export function SurvivorFromJSON(json: any): Survivor {
  return SurvivorFromJSONTyped(json, false);
}

export function SurvivorFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): Survivor {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    name: json["name"],
    age: json["age"],
    gender: json["gender"],
    latitude: json["latitude"],
    longitude: json["longitude"],
  };
}

export function SurvivorToJSON(json: any): Survivor {
  return SurvivorToJSONTyped(json, false);
}

export function SurvivorToJSONTyped(
  value?: Survivor | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value["id"],
    name: value["name"],
    age: value["age"],
    gender: value["gender"],
    latitude: value["latitude"],
    longitude: value["longitude"],
  };
}
