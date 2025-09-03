# AI Studio React TypeScript + Vite

A modern React TypeScript application built with Vite for AI image generation and processing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ai-studio-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   The app will automatically open at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## ✨ Features

- **File Upload**: Drag-and-drop image upload with validation (PNG/JPG, ≤10MB)
- **Image Processing**: Client-side image resizing to ≤1920px using Canvas API
- **Prompt Input**: Real-time prompt input with style selection
- **Live Preview**: Dynamic summary showing image + prompt + style
- **Mock API**: Simulated generation with loading states and error handling
- **History Management**: LocalStorage persistence of last 5 generations
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Strict typing throughout application
- **Modern UI**: TailwindCSS with responsive design

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety with strict configuration
- **Vite** - Lightning-fast build tool and dev server  
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icons
- **ESLint** - Code linting and quality assurance

## 📁 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── api/                # API layer
├── App.tsx
└── main.tsx
```

## 🧪 Development

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint
```

Built with ❤️ using modern web technologies
