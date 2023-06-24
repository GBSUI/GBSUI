export interface IApiResponse<T = any, E = any> {
    response: T | null;
    error: E | any | null;
}

export default IApiResponse;