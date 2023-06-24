export interface IApiConfig {
    url: string;
    method: string;
    data?: any;
    headers?: { [key: string]: string};
}

export default IApiConfig;