export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-purple-500 font-space text-sm">
          Loading simulation...
        </div>
      </div>
    </div>
  );
} 