
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(44,44,84,0.9)]">
  <div className="relative">
    {/* Outer Circle */}
    <div className="w-20 h-20 border-[rgba(255,215,0,0.5)] border-2 rounded-full" />
    {/* Inner Circle (Spinning) */}
    <div
      className="w-20 h-20 border-[rgba(255,215,0,0.9)] border-t-2 border-l-2 animate-spin
      rounded-full absolute left-0 top-0"
    />
    {/* Accessibility */}
    <div className="sr-only">Loading</div>
  </div>
</div>

  )
}

export default LoadingSpinner