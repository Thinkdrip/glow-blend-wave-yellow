import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Glow Blend Wave
        </h1>
        <p className="text-xl text-slate-300 max-w-md">
          Your app builder workspace is ready.
        </p>
        <div className="pt-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition">
            Start Building
          </div>
        </div>
      </div>
    </div>
  )
}
