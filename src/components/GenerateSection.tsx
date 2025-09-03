import React from 'react'
import { Play, Square, Loader } from 'lucide-react'
import { GenerateSectionProps } from '../types'

export const GenerateSection: React.FC<GenerateSectionProps> = ({
  isGenerating,
  onGenerate,
  onAbort,
  canGenerate
}) => {
  return (
    <section className="card p-6" aria-labelledby="generate-title">
      <h2 id="generate-title" className="text-lg font-semibold text-gray-900 mb-4">
        Generate
      </h2>

      <div className="space-y-4">
        {!isGenerating ? (
          <button
            onClick={onGenerate}
            disabled={!canGenerate}
            className="w-full btn-primary flex items-center justify-center gap-2"
            aria-describedby="generate-help"
          >
            <Play className="w-4 h-4" />
            Generate Image
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 p-4 bg-primary-50 rounded-lg">
              <Loader className="w-5 h-5 text-primary-600 animate-spin" />
              <span className="text-primary-700 font-medium">Generating...</span>
            </div>

            <button
              onClick={onAbort}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4" />
              Abort Generation
            </button>
          </div>
        )}

        <p id="generate-help" className="text-xs text-gray-500">
          {!canGenerate 
            ? 'Upload an image, enter a prompt, and select a style to generate'
            : 'Click to start AI image generation'
          }
        </p>
      </div>
    </section>
  )
}