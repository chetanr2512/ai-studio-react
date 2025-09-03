import React, { useCallback } from 'react'
import { Type, Palette } from 'lucide-react'
import { PromptSectionProps } from '../types'
import { STYLE_OPTIONS } from '../utils/constants'

export const PromptSection: React.FC<PromptSectionProps> = ({
  prompt,
  style,
  onPromptChange,
  onStyleChange
}) => {
  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(e.target.value)
  }, [onPromptChange])

  const handleStyleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onStyleChange(e.target.value as any)
  }, [onStyleChange])

  return (
    <section className="card p-6" aria-labelledby="prompt-title">
      <h2 id="prompt-title" className="text-lg font-semibold text-gray-900 mb-4">
        Prompt & Style
      </h2>

      <div className="space-y-4">
        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt-input" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4" />
            Describe your image
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="A futuristic cityscape at sunset with flying cars..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={3}
            aria-describedby="prompt-help"
          />
          <p id="prompt-help" className="text-xs text-gray-500 mt-1">
            Be descriptive and specific for better results
          </p>
        </div>

        {/* Style Selection */}
        <div>
          <label htmlFor="style-select" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4" />
            Style
          </label>
          <select
            id="style-select"
            value={style}
            onChange={handleStyleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-describedby="style-help"
          >
            {STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p id="style-help" className="text-xs text-gray-500 mt-1">
            Choose a visual style for your generation
          </p>
        </div>
      </div>
    </section>
  )
}