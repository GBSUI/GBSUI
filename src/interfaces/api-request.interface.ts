export interface IApiRequest {
    baseUrl: string;
    url: string;
    data?: any;
    bearerToken?: string // Optional bearer token parameter
    method?: string;
    headers?: { [key: string]: string};
}

export default IApiRequest;