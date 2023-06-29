import IApiStatus from "./api-status.interface";

export interface IApiResponse<T = any, E = any> {
    response: T | IApiStatus | null
    error: E | IApiStatus | null
}

export default IApiResponse;