import { ApiRequest, ApiResponse, ApiError } from '../types'
import { generateId } from '../utils/imageUtils'
import { API_DELAY_MIN, API_DELAY_MAX, API_ERROR_RATE } from '../utils/constants'

const MOCK_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop'
]

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const mockApiCall = async (
  request: ApiRequest, 
  signal?: AbortSignal
): Promise<ApiResponse> => {
  const delayTime = Math.random() * (API_DELAY_MAX - API_DELAY_MIN) + API_DELAY_MIN

  // Check if request should be aborted
  if (signal?.aborted) {
    throw new Error('Request aborted')
  }

  await delay(delayTime)

  // Check again after delay
  if (signal?.aborted) {
    const error = new Error('Request aborted')
    error.name = 'AbortError'
    throw error
  }

  // Simulate 20% error rate
  if (Math.random() < API_ERROR_RATE) {
    const error: ApiError = {
      message: 'Model overloaded. Please try again.',
      code: 'MODEL_OVERLOADED'
    }
    throw error
  }

  // Generate mock response
  const response: ApiResponse = {
    id: generateId(),
    imageUrl: MOCK_IMAGE_URLS[Math.floor(Math.random() * MOCK_IMAGE_URLS.length)],
    prompt: request.prompt,
    style: request.style,
    createdAt: new Date().toISOString()
  }

  return response
}

export const mockApiCallWithRetry = async (
  request: ApiRequest,
  maxRetries = 3,
  signal?: AbortSignal
): Promise<ApiResponse> => {
  let lastError: any

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await mockApiCall(request, signal)
    } catch (error: any) {
      lastError = error

      if (error.name === 'AbortError' || signal?.aborted) {
        throw error
      }

      if (attempt === maxRetries - 1) {
        break
      }

      // Exponential backoff: 1s, 2s, 4s
      const backoffDelay = Math.pow(2, attempt) * 1000
      await delay(backoffDelay)

      if (signal?.aborted) {
        const abortError = new Error('Request aborted')
        abortError.name = 'AbortError'
        throw abortError
      }
    }
  }

  throw lastError
}