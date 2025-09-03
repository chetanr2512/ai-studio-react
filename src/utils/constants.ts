import { StyleOption } from '../types'

export const STYLE_OPTIONS: StyleOption[] = [
  { value: '', label: 'Select a style...' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'cyberpunk', label: 'Cyberpunk' }
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_IMAGE_DIMENSION = 1920
export const MAX_HISTORY_ITEMS = 5
export const API_DELAY_MIN = 1000
export const API_DELAY_MAX = 2000
export const API_ERROR_RATE = 0.2
export const MAX_RETRIES = 3

export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const TOAST_DURATION = 5000