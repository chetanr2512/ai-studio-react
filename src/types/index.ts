export interface GenerationResult {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface ImageData {
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  processedSize: number;
}

export type Style = '' | 'editorial' | 'streetwear' | 'vintage' | 'minimalist' | 'cyberpunk';

export interface StyleOption {
  value: Style;
  label: string;
}

export interface ApiRequest {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

export interface ApiResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface UploadSectionProps {
  currentImage: File | null;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

export interface PromptSectionProps {
  prompt: string;
  style: Style;
  onPromptChange: (prompt: string) => void;
  onStyleChange: (style: Style) => void;
}

export interface GenerateSectionProps {
  isGenerating: boolean;
  onGenerate: () => void;
  onAbort: () => void;
  canGenerate: boolean;
}

export interface LiveSummaryProps {
  image: File | null;
  prompt: string;
  style: Style;
}

export interface HistorySectionProps {
  history: GenerationResult[];
  onRestore: (item: GenerationResult) => void;
  onClear: () => void;
}