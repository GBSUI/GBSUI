// Interfaces
import { IApiConfig, IApiParams, IApiResponse, IApiStatus } from "../interfaces";

export const useApi = () => {

    const callApi = async <T, E>({ baseUrl, method, url, data, headers, bearerToken }:  IApiParams & IApiConfig) : Promise<IApiResponse< T | IApiStatus, E | IApiStatus>> => {
        
        const requestHeaders: any = {};

        // Check if the bearer token exists
        if (bearerToken) {
            // Add the bearer token to the headers
            requestHeaders["Authorization"] = `Bearer ${bearerToken}`;
        }

        if (headers) {
            Object.assign(requestHeaders, headers);
        }

        const response = await fetch(`${baseUrl}${url}`, {
            method,
            headers: requestHeaders,
            body: data? JSON.stringify(data) : undefined
        });

        let body = await response.json();
        let error: IApiStatus | any | null = null;
        let apiStatus: IApiStatus = {
            status: response.status,
            statusText: response.statusText,
        }

        // Check the response status code
        if (response.status < 200 || response.status > 299) {
            if (body) {
                // Set error
                error = body;
            } else {
                // Throw IApiStatus
                error = apiStatus;
            }
        } else {
            if (!body) {
                body = apiStatus;
            }
        }

        if (error) {
            return {
                response: null,
                error: error
            }
        }

        return {
            response: body,
            error: null
        }

    };

    const get = <T, E>({ baseUrl, bearerToken}: IApiParams, url: string): Promise<IApiResponse<T | IApiStatus, E | IApiStatus>> => {
        return callApi<T, E>({baseUrl, method: "GET", url, bearerToken});
    };

    const post = <T, E>({ baseUrl, bearerToken}: IApiParams, data: T, url: string): Promise<IApiResponse<T | IApiStatus, E | IApiStatus>> => {
        return callApi<T, E>({baseUrl, method: "POST", data, url, bearerToken});
    };

    const put = <T, E>({ baseUrl, bearerToken}: IApiParams, data: T, url: string): Promise<IApiResponse<T | IApiStatus, E | IApiStatus>> => {
        return callApi<T, E>({baseUrl, method: "PUT", data, url, bearerToken});
    };
    
    const del = <T, E>({ baseUrl, bearerToken}: IApiParams, url: string): Promise<IApiResponse<T | IApiStatus, E | IApiStatus>> => {
        return callApi<T, E>({baseUrl, method: "DELETE", url, bearerToken});
    };

    return {
        post,
        get,
        put,
        del
    };

};

export default useApi;