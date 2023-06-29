import { IApiStatus } from '../interfaces';
import useFetch from './useFetch';

describe('useFetch', () => {
  const baseUrl = 'https://api.example.com';
  const bearerToken = 'your-bearer-token';
  const data = { teste: 'example data' };

  it('should make a GET request successfully', async () => {
    // Arrange
    const mockResponse = { data: 'example data' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      statusText: 'OK',
    });

    // Act
    const { get } = useFetch();
    const response = await get<{ data: string }, any>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });

  it('should handle a GET request error', async () => {
    // Arrange
    const mockError = { message: 'Example error' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
      status: 404,
      statusText: 'Not Found',
    });

    // Act
    const { get } = useFetch();
    const response = await get<any, { message: string }>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should make a POST request successfully', async () => {
    // Arrange
    const mockResponse = { data: 'example data' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      statusText: 'OK',
    });

    // Act
    const { post } = useFetch();
    const response = await post<{ data: string }, any>({ baseUrl, url: '/example', bearerToken, data });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: JSON.stringify(data),
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });

  it('should handle a POST request error', async () => {
    // Arrange
    const mockError = { message: 'Example error' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
      status: 404,
      statusText: 'Not Found',
    });

    // Act
    const { post } = useFetch();
    const response = await post<any, { message: string }>({ baseUrl, url: '/example', bearerToken, data });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: JSON.stringify(data),
    });
    expect(response.response).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should make a PUT request successfully', async () => {
    // Arrange
    const mockResponse = { data: 'example data' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      statusText: 'OK',
    });

    // Act
    const { put } = useFetch();
    const response = await put<{ data: string }, any>({ baseUrl, url: '/example', bearerToken, data });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: JSON.stringify(data),
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });

  it('should handle a PUT request error', async () => {
    // Arrange
    const mockError = { message: 'Example error' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
      status: 404,
      statusText: 'Not Found',
    });

    // Act
    const { put } = useFetch();
    const response = await put<any, { message: string }>({ baseUrl, url: '/example', bearerToken, data });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: JSON.stringify(data),
    });
    expect(response.response).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should make a DELETE request successfully', async () => {
    // Arrange
    const mockResponse = { data: 'example data' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      statusText: 'OK',
    });

    // Act
    const { del } = useFetch();
    const response = await del<{ data: string }, any>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });

  it('should handle a DELETE request error', async () => {
    // Arrange
    const mockError = { message: 'Example error' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
      status: 403,
      statusText: 'Unauthorized',
    });

    // Act
    const { del } = useFetch();
    const response = await del<any, { message: string }>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should make a request successfully without returning a json', async () => {
    // Arrange
    const mockResponse: IApiStatus = { 
        status: 200,
        statusText: "OK"
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(null),
      statusText: 'OK',
    });

    // Act
    const { post } = useFetch();
    const response = await post<{ data: string }, any>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });
  
  it('should handle a request error without returning a json', async () => {
    // Arrange
    const mockError: IApiStatus = { 
        status: 404,
        statusText: "Not Found"
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue(null),
      statusText: 'Not Found',
    });

    // Act
    const { get } = useFetch();
    const response = await get<{ data: string }, any>({ baseUrl, url: '/example', bearerToken });

    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${bearerToken}` },
      body: undefined,
    });
    expect(response.response).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should make a request without bearer token', async () => {
    // Arrange
    const mockResponse = { data: 'example data' };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      statusText: 'OK',
    });
  
    // Act
    const { get } = useFetch();
    const response = await get<{ data: string }, any>({
      baseUrl,
      url: '/example',
    });
  
    // Assert
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/example`, {
      method: 'GET',
      headers: {},
      body: undefined,
    });
    expect(response.response).toEqual(mockResponse);
    expect(response.error).toBeNull();
  });

});
