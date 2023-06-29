export interface IApiRequest {
    baseUrl: string
    url: string
    data?: any
    bearerToken?: string
    method?: string
    headers?: { [key: string]: string}
}

export default IApiRequest;