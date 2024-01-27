// @ts-ignore
import { useRequestState } from "./useRequestState";
import { useCallback } from "react";
export function useApiRequest<Resp = unknown, Body = void>(
  path: string,
  method = "POST",
) {
  const { setError, setLoading, setData, state } = useRequestState<
    Resp,
    string
  >();

  const fn = useCallback(
    async (body: Body) => {
      setLoading(true);

      try {
        const payload = JSON.stringify(body);

        const data = await executeFetchRequest<Resp>(path, payload, method);

        setData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : `Unknown error`;

        setError(message);

        return Promise.reject(error);
      }
    },
    [path, method, setLoading, setData, setError],
  );

  return [fn, state] as [typeof fn, typeof state];
}

async function executeFetchRequest<Resp = unknown>(
  url: string,
  payload: string,
  method = "POST",
) {
  const options: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const methodsSupportingBody: any[] = ["POST", "PUT"];

  const supportsBody = methodsSupportingBody.includes(method);

  if (payload && supportsBody) {
    options.body = payload;
  }

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return (await response.json()) as Promise<Resp>;
    }

    return Promise.reject(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
