import React from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { UploadSection } from './components/UploadSection'
import { PromptSection } from './components/PromptSection'
import { LiveSummary } from './components/LiveSummary'
import { GenerateSection } from './components/GenerateSection'
import { HistorySection } from './components/HistorySection'
import { ToastProvider } from './components/ToastProvider'
import { useAIStudio } from './hooks/useAIStudio'

function App() {
  const {
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
  } = useAIStudio()

  return (
    <ToastProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <UploadSection 
                  currentImage={currentImage}
                  onImageUpload={uploadImage}
                  onImageRemove={removeImage}
                />

                <PromptSection
                  prompt={currentPrompt}
                  style={currentStyle}
                  onPromptChange={updatePrompt}
                  onStyleChange={updateStyle}
                />

                <GenerateSection
                  isGenerating={isGenerating}
                  onGenerate={generate}
                  onAbort={abortGeneration}
                  canGenerate={!!currentImage && !!currentPrompt && !!currentStyle}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <LiveSummary
                  image={currentImage}
                  prompt={currentPrompt}
                  style={currentStyle}
                />

                <HistorySection
                  history={history}
                  onRestore={restoreFromHistory}
                  onClear={clearHistory}
                />
              </div>
            </div>
          </main>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  )
}

export default App