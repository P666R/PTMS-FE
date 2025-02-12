type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function returnCorrectRequest(method: Method, data: unknown): RequestInit {
  const headers = { 'Content-Type': 'application/json' };
  return method === 'GET'
    ? { method, headers }
    : { method, headers, body: JSON.stringify(data) };
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(url, returnCorrectRequest(method, data));

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
