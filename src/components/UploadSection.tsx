import React, { useRef, useState, DragEvent, ChangeEvent } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { UploadSectionProps } from '../types'
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '../utils/constants'
import { formatFileSize } from '../utils/imageUtils'

export const UploadSection: React.FC<UploadSectionProps> = ({
  currentImage,
  onImageUpload,
  onImageRemove
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  React.useEffect(() => {
    if (currentImage) {
      const url = URL.createObjectURL(currentImage)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [currentImage])

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileValidation(files[0])
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileValidation(files[0])
    }
  }

  const handleFileValidation = (file: File) => {
    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      alert('Please upload a PNG or JPG image file.')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 10MB.')
      return
    }

    onImageUpload(file)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  return (
    <section className="card p-6" aria-labelledby="upload-title">
      <h2 id="upload-title" className="text-lg font-semibold text-gray-900 mb-4">
        Upload Image
      </h2>

      {!currentImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            isDragOver 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Upload image file"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-1">Drop your image here, or click to browse</p>
          <p className="text-sm text-gray-500">PNG or JPG (max 10MB)</p>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(',')}
            onChange={handleFileSelect}
            className="sr-only"
            aria-describedby="upload-help"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={previewUrl || ''}
              alt="Uploaded preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={onImageRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {currentImage.name}
            </span>
            <span>{formatFileSize(currentImage.size)}</span>
          </div>
        </div>
      )}
    </section>
  )
}