import axios from "axios"

/**
 * Centralized axios instance with a predefined baseURL.
 * This can be easily configured with headers, interceptors, etc. in one place.
 */
export const apiClient = axios.create({})

/**
 * A reusable, consistent error handler for API calls.
 * It parses axios errors to provide clear, user-friendly messages.
 * @param error - The error object caught in the try-catch block.
 * @param context - A string describing the action that failed (e.g., "creating post").
 * @returns - This function never returns a value; it throws a new Error.
 */
export const handleApiError = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    // Error came from the server response
    const serverError = error.response?.data
    const errorMessage =
      serverError?.error || `Request failed with status ${error.response?.status}`
    console.error(`API Error ${context}:`, errorMessage)
    throw new Error(errorMessage)
  } else {
    // A network error or an unexpected issue occurred
    console.error(`Unexpected error ${context}:`, error)
    throw new Error("An unexpected network error occurred.")
  }
}