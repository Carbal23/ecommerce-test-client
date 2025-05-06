import { useCallback, useEffect } from "react";
import { useTokenAuth } from "./useTokenAuth";
import { API_HOST } from "@/app/config-global";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<T> {
  endpoint: string;
  method?: RequestMethod;
  body?: T;
  headers?: HeadersInit;
}

export interface ApiError {
  success: boolean;
  message: string;
  status: number;
  details?: Array<{
    field: string;
    error: string;
  }>;
  code?: string;
}

export function useApi() {
  const { token, setToken } = useTokenAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [setToken]);

  const request = useCallback(
    async <T, R = unknown>({
      endpoint,
      method = "GET",
      body,
      headers,
    }: FetchOptions<T>): Promise<R> => {
      try {
        const isFormData = body instanceof FormData;

        const response = await fetch(`${API_HOST}${endpoint}`, {
          method,
          headers: {
            ...(!isFormData && { "Content-Type": "application/json" }),
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
          body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
          const error: ApiError = {
            success: data.success || false,
            message: data.message || data.message || "Error desconocido",
            status: response.status,
            details: data.details,
            code: data.code,
          };
          throw error;
        }

        return data as R;
      } catch (error) {
        console.error("API Request Error:", error);

        // Si es un error de red (no llegó al backend)
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          const networkError: ApiError = {
            success: false,
            message: "Error de conexión con el servidor",
            status: 0, 
            code: "NETWORK_ERROR",
          };
          throw networkError;
        }

        // Si ya es un ApiError, lo relanzamos
        if (typeof error === "object" && error !== null && "status" in error) {
          throw error;
        }

        // Para cualquier otro error inesperado
        const unexpectedError: ApiError = {
          success: false,
          message: "Error inesperado",
          status: 500,
          code: "UNEXPECTED_ERROR",
        };
        throw unexpectedError;
      }
    },
    [token]
  );

  return {
    get: <R = unknown>(endpoint: string, headers?: HeadersInit) =>
      request<void, R>({ endpoint, method: "GET", headers }),

    post: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "POST", body, headers }),

    put: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "PUT", body, headers }),

    patch: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "PATCH", body, headers }),

    delete: <R = unknown>(endpoint: string, headers?: HeadersInit) =>
      request<void, R>({ endpoint, method: "DELETE", headers }),
  };
}
