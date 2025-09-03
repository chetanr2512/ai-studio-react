import React from 'react'
import { Eye, FileImage, Type, Palette } from 'lucide-react'
import { LiveSummaryProps } from '../types'

export const LiveSummary: React.FC<LiveSummaryProps> = ({
  image,
  prompt,
  style
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [image])

  return (
    <section className="card p-6" aria-labelledby="summary-title">
      <h2 id="summary-title" className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
        <Eye className="w-5 h-5" />
        Live Preview
      </h2>

      <div className="space-y-4">
        {/* Image Preview */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <FileImage className="w-4 h-4" />
            Source Image
          </h3>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FileImage className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Prompt Preview */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4" />
            Prompt
          </h3>
          <div className="p-3 bg-gray-50 rounded-lg border min-h-[60px]">
            {prompt ? (
              <p className="text-sm text-gray-700">{prompt}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">No prompt entered</p>
            )}
          </div>
        </div>

        {/* Style Preview */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4" />
            Style
          </h3>
          <div className="p-3 bg-gray-50 rounded-lg border">
            {style ? (
              <span className="inline-flex items-center gap-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm font-medium">
                <Palette className="w-3 h-3" />
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </span>
            ) : (
              <p className="text-sm text-gray-400 italic">No style selected</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}