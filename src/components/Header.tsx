import React from 'react'
import { Sparkles } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Studio</h1>
            <p className="text-gray-600 text-sm">Create stunning images with AI generation</p>
          </div>
        </div>
      </div>
    </header>
  )
}