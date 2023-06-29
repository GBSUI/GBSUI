// Interfaces
import { IApiRequest, IApiResponse, IApiStatus } from "../interfaces";

/**
 * A module for making HTTP requests using the fetch API.
 * @module useFetch
 */

/**
 * Perform HTTP requests.
 * @returns {object} Functions for making HTTP requests.
 */

export const useFetch = () => {

    const request = async <T, E>({ baseUrl, method, url, data, headers, bearerToken }:  IApiRequest) : Promise<IApiResponse<T, E>> => {
        
        const requestHeaders: any = {};

        if (bearerToken) {
            requestHeaders["Authorization"] = `Bearer ${bearerToken}`;' '
        }

        if (headers) {
            Object.assign(requestHeaders, headers);
        }

        const response = await fetch(`${baseUrl}${url}`, {
            method,
            headers: requestHeaders,
            body: data? JSON.stringify(data) : undefined
        });
        
        const body = await response.json();

        let apiStatus: IApiStatus = {
            status: response.status,
            statusText: response.statusText,
        }

        if (response.ok) {
            return {
                response: body ? body : apiStatus,
                error: null
            }
        }

        return {
            response: null,
            error: body ? body : apiStatus
        }

    };

    /**
     * Send a GET request.
     * @param {IApiRequest} config - The request configuration.
     * @returns {Promise<IApiResponse<T, E>>} A promise that resolves to the API response or error.
     */
    const get = <T, E>({ baseUrl, url, bearerToken}: IApiRequest): Promise<IApiResponse<T, E>> => {
        return request<T, E>({baseUrl, url, method: "GET", bearerToken});
    };

    /**
     * Send a POST request.
     * @param {IApiRequest} config - The request configuration.
     * @returns {Promise<IApiResponse<T, E>>} A promise that resolves to the API response or error.
     */
    const post = <T, E>({ baseUrl, url, data, bearerToken}: IApiRequest,): Promise<IApiResponse<T, E>> => {
        return request<T, E>({baseUrl, data, method: "POST", url, bearerToken});
    };

    /**
     * Send a PUT request.
     * @param {IApiRequest} config - The request configuration.
     * @returns {Promise<IApiResponse<T, E>>} A promise that resolves to the API response or error.
     */
    const put = <T, E>({ baseUrl, url, data, bearerToken}: IApiRequest,): Promise<IApiResponse<T, E>> => {
        return request<T, E>({baseUrl, data, method: "PUT", url, bearerToken});
    };
    
    /**
     * Send a DELETE request.
     * @param {IApiRequest} config - The request configuration.
     * @returns {Promise<IApiResponse<T, E>>} A promise that resolves to the API response or error.
     */
    const del = <T, E>({ baseUrl, url, bearerToken}: IApiRequest): Promise<IApiResponse<T, E>> => {
        return request<T, E>({baseUrl, url, method: "DELETE", bearerToken});
    };

    return {
        post,
        get,
        put,
        del
    };

};

export default useFetch;