import { useFetch, useUrlSearchParams, type UseFetchOptions, type UseFetchReturn } from "@vueuse/core"
import { MessageService } from "vue-mf-module";
 
 
export enum CacheStategy {
  NetworkFirst,
  CacheFirst,
  None
}
 
/// ----------------------------------------------------------------------------  ///
///                                 ATTENZIONE                                    ///
///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
/// ----------------------------------------------------------------------------  ///
export class baseRestService {
 
  protected allwaysSendAuthenticationToken: boolean = true;
  protected saveToSessionStorage: boolean = true;
  baseUrl: () => string = () => "";
 
  OnError?: OnErrorDelegate;
  OnHeadersPreparing?: OnHeadersPreparingDelegate;
 
  protected async getRaw(uri: string, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<UseFetchReturn<any>> {
 
    let url = new URL(`${this.baseUrl()}${uri}`);
    url.search = new URLSearchParams(params).toString();
 
    let response = await useFetch<any>(url.toString(), {
      headers: await this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false, cacheStrategy),
    }, {}).get().arrayBuffer();
 
    if (response.statusCode?.value == 200)
      return response
 
    const errorMessage = (await response.response?.value!.text()) || response.error?.value! || `error ${response.statusCode} when calling ${uri}`;
    if (this.OnError) this.OnError(errorMessage);
    throw errorMessage;
  };
 
 
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async get(uri: string, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.NetworkFirst): Promise<UseFetchReturn<any>> {
 
    let url = new URL(`${this.baseUrl()}${uri}`);
    url.search = new URLSearchParams(params).toString();
 
    let response = await useFetch<any>(url.toString(), {
      headers: await this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false, cacheStrategy),
    }, {}).get().json();
 
    if (response.statusCode?.value == 200)
      return response
 
    const errorMessage = (await response.response?.value!.text()) || response.error?.value! || `error ${response.statusCode} when calling ${uri}`;
    if (this.OnError) this.OnError(errorMessage);
    throw errorMessage;
  };
 
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
 
  protected async Get<TResult>(uri: string, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.NetworkFirst): Promise<TResult | null> {
    let result = await this.get(uri, params, sendAuthenticationToken, cacheStrategy);
    return result.data?.value! as TResult;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async post(uri: string, data: any, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<UseFetchReturn<any>> {
    let url = new URL(`${this.baseUrl()}${uri}`);
    url.search = new URLSearchParams(params).toString();
 
    let response = await useFetch<any>(url.toString(), {
      headers: await this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false, cacheStrategy),
      body: data
    }, {}).post().json();
 
    if (response.statusCode?.value == 200)
      return response
 
    const errorMessage = (await response.response?.value!.text()) || response.error?.value! || `error ${response.statusCode} when calling ${uri}`;
    if (this.OnError) this.OnError(errorMessage);
    throw errorMessage;
  };
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async Post<TResult>(uri: string, data: any, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<TResult | null> {
    let result = await this.post(uri, data, params, sendAuthenticationToken, cacheStrategy);
    return result.data?.value! as TResult;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async put(uri: string, data: any, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<UseFetchReturn<any>> {
    let url = new URL(`${this.baseUrl()}${uri}`);
    url.search = new URLSearchParams(params).toString();
 
    let response = await useFetch<any>(url.toString(), {
      headers: await this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false, cacheStrategy),
      body: data
    }, {}).put().json();
 
    // transformResponse: (resp => resp ? JSON.parse(resp, toDate) : null)
 
    if (response.statusCode?.value == 200)
      return response
 
    const errorMessage = (await response.response?.value!.text()) || response.error?.value! || `error ${response.statusCode} when calling ${uri}`;
    if (this.OnError) this.OnError(errorMessage);
    throw errorMessage;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async Put<TResult>(uri: string, data: any, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<TResult | null> {
    let result = await this.put(uri, data, params, sendAuthenticationToken, cacheStrategy);
    return result.data?.value! as TResult;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async delete(uri: string, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<UseFetchReturn<any>> {
    let url = new URL(`${this.baseUrl()}${uri}`);
    url.search = new URLSearchParams(params).toString();
 
    let response = await useFetch<any>(url.toString(), {
      headers: await this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false, cacheStrategy),
    }, {}).delete().json();
 
    if (response.statusCode?.value == 200)
      return response
 
    const errorMessage = (await response.response?.value!.text()) || response.error?.value! || `error ${response.statusCode} when calling ${uri}`;
    if (this.OnError) this.OnError(errorMessage);
    throw errorMessage;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async Delete<TResult>(uri: string, params: Record<string, any> = {}, sendAuthenticationToken: boolean = false, cacheStrategy: CacheStategy = CacheStategy.None): Promise<TResult | null> {
    let result = await this.delete(uri, params, sendAuthenticationToken, cacheStrategy);
    return result.data?.value! as TResult;
  }
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async prepareHeaders(auth: boolean = false, json: boolean = true, cacheStrategy: CacheStategy = CacheStategy.None): Promise<any> {
 
    let headers: any = {};
    if (auth) {
      let authData = await this.getAuthenticationToken();
      if (authData) {
        headers['Authorization'] = 'Bearer ' + authData.access_token;
      }
    }
    if (json) headers['Content-Type'] = 'application/json';
 
    switch (cacheStrategy) {
      case CacheStategy.NetworkFirst: headers['X-Strategy'] = 'networkFirst'; break;
      case CacheStategy.CacheFirst: headers['X-Strategy'] = 'cacheFirst'; break;
      case CacheStategy.None:
      default: break;
    }
 
    if (this.OnHeadersPreparing) this.OnHeadersPreparing(headers);
    return headers;
  }
 
  protected static _token: AuthToken | null;
 
  /// ----------------------------------------------------------------------------  ///
  ///                                 ATTENZIONE                                    ///
  ///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
  /// ----------------------------------------------------------------------------  ///
  protected async getAuthenticationToken(): Promise<AuthToken> {
    return await MessageService.Instance.ask("ACCESS_TOKEN")
  }
}
 
export interface OnErrorDelegate { (message: string): void; }
interface OnHeadersPreparingDelegate { (headers: Headers): void; }
 
/// ----------------------------------------------------------------------------  ///
///                                  ATTENZIONE                                    ///
///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
/// ----------------------------------------------------------------------------  ///
export interface AuthToken {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  expiration_date: number;
  resource: string;
  userName: string;
  token_type: string;
}
 
/// ----------------------------------------------------------------------------  ///
///                                 ATTENZIONE                                    ///
///            VIETATO APPORTARE QUALSIASI MODIFICA A QUESTO METODO O CLASSE      ///
/// ----------------------------------------------------------------------------  ///
export interface DataResponse {
  status: number;
  statusText: string;
  data: any;
}
 
 
// const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z?|(\+|-)([\d|:]*))?$/;
const reISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
 
export function toDate(key: string, value: string) {
  if (typeof value === "string") {
    var a = reISO.exec(value);
    if (a) {
      if (value.indexOf("Z") <= 0)
        return new Date(value + "Z");
      else
        return new Date(value);
    }
    a = reMsAjax.exec(value);
    if (a) {
      var b = a[1].split(/[-+,.]/);
      return new Date(b[0] ? +b[0] : 0 - +b[1]);
    }
  }
  return value;
}