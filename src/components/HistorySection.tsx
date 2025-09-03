import React from 'react'
import { History, RotateCcw, Trash2 } from 'lucide-react'
import { HistorySectionProps } from '../types'

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onRestore,
  onClear
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="card p-6" aria-labelledby="history-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="history-title" className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <History className="w-5 h-5" />
          History
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
            aria-label="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No generations yet</p>
            <p className="text-xs text-gray-400">Your generated images will appear here</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer border"
              onClick={() => onRestore(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRestore(item)
                }
              }}
              aria-label={`Restore generation: ${item.prompt.substring(0, 50)}...`}
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.prompt}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700">
                      {item.style}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RotateCcw className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}