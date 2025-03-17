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
 * @interface TradeRequest
 */
export interface TradeRequest {
  /**
   *
   * @type {number}
   * @memberof TradeRequest
   */
  senderId: number;
  /**
   *
   * @type {number}
   * @memberof TradeRequest
   */
  receiverId: number;
  /**
   *
   * @type {{ [key: string]: number; }}
   * @memberof TradeRequest
   */
  itemDeltas: { [key: string]: number };
}

/**
 * Check if a given object implements the TradeRequest interface.
 */
export function instanceOfTradeRequest(value: object): value is TradeRequest {
  if (!("senderId" in value) || value["senderId"] === undefined) return false;
  if (!("receiverId" in value) || value["receiverId"] === undefined)
    return false;
  if (!("itemDeltas" in value) || value["itemDeltas"] === undefined)
    return false;
  return true;
}

export function TradeRequestFromJSON(json: any): TradeRequest {
  return TradeRequestFromJSONTyped(json, false);
}

export function TradeRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): TradeRequest {
  if (json == null) {
    return json;
  }
  return {
    senderId: json["sender_id"],
    receiverId: json["receiver_id"],
    itemDeltas: json["item_deltas"],
  };
}

export function TradeRequestToJSON(json: any): TradeRequest {
  return TradeRequestToJSONTyped(json, false);
}

export function TradeRequestToJSONTyped(
  value?: TradeRequest | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value;
  }

  return {
    sender_id: value["senderId"],
    receiver_id: value["receiverId"],
    item_deltas: value["itemDeltas"],
  };
}
