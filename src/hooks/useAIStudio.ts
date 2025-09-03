import { useState, useCallback, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useToast } from './useToast'
import { GenerationResult, Style } from '../types'
import { resizeImage } from '../utils/imageUtils'
import { mockApiCall } from '../api/mockApi'

export const useAIStudio = () => {
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState<string>('')
  const [currentStyle, setCurrentStyle] = useState<Style>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [history, setHistory] = useLocalStorage<GenerationResult[]>('ai-studio-history', [])

  const { showToast } = useToast()
  const abortControllerRef = useRef<AbortController | null>(null)

  const uploadImage = useCallback(async (file: File) => {
    try {
      const resizedFile = await resizeImage(file)
      setCurrentImage(resizedFile)
      showToast('Image uploaded successfully!', 'success')
    } catch (error) {
      console.error('Upload error:', error)
      showToast('Failed to upload image. Please try again.', 'error')
    }
  }, [showToast])

  const updatePrompt = useCallback((prompt: string) => {
    setCurrentPrompt(prompt)
  }, [])

  const updateStyle = useCallback((style: Style) => {
    setCurrentStyle(style)
  }, [])

  const generate = useCallback(async () => {
    if (!currentImage || !currentPrompt || !currentStyle) return

    setIsGenerating(true)
    abortControllerRef.current = new AbortController()

    try {
      const imageDataUrl = await fileToDataUrl(currentImage)
      const result = await mockApiCall({
        imageDataUrl,
        prompt: currentPrompt,
        style: currentStyle
      }, abortControllerRef.current.signal)

      // Add to history (keep only last 5)
      setHistory((prev :) => {
        const newHistory = [result, ...prev].slice(0, 5)
        return newHistory
      })

      showToast('Generation completed successfully!', 'success')
    } catch (error: any) {
      if (error.name === 'AbortError') {
        showToast('Generation aborted', 'info')
      } else {
        showToast(`Generation failed: ${error.message}`, 'error')
      }
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }, [currentImage, currentPrompt, currentStyle, setHistory, showToast])

  const abortGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  const restoreFromHistory = useCallback((item: GenerationResult) => {
    setCurrentPrompt(item.prompt)
    setCurrentStyle(item.style as Style)
    showToast('Restored from history', 'success')
  }, [showToast])

  const clearHistory = useCallback(() => {
    setHistory([])
    showToast('History cleared', 'success')
  }, [setHistory, showToast])

  const removeImage = useCallback(() => {
    setCurrentImage(null)
    setCurrentPrompt("")
     setCurrentStyle("")
    showToast('Image removed', 'info')
  }, [showToast])

  return {
    currentImage,
    currentPrompt,
    currentStyle,
    isGenerating,
    history,
    uploadImage,
    updatePrompt,
    updateStyle,
    generate,
    abortGeneration,
    restoreFromHistory,
    clearHistory,
    removeImage
  }
}

// Utility function to convert File to data URL
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}