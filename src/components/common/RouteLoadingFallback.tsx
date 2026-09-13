/**
 * RouteLoadingFallback Component
 * Displayed when code-split route chunks load during page navigation.
 * Features the official emblem, smooth breathing animation, and an elegant loader bar.
 */
export function RouteLoadingFallback() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#F8FAFC] py-12 px-4 animate-fade-in">
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Breathing Logo Card */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white shadow-lg border-2 border-[#115E59]/40 flex items-center justify-center animate-pulse-gentle">
            <img
              src="/logo.png"
              alt="DharaniSetu Emblem"
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.jpg';
              }}
            />
          </div>
        </div>

        {/* Brand typography */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
          <span className="text-[#014723]">Dharani</span>
          <span className="text-[#03244F]">Setu</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium mb-4">
          Government Land & Statutory Registry
        </p>

        {/* Elegant Animated Progress Track */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#115E59] via-[#0D9488] to-[#D97706] rounded-full animate-progress-beam" />
        </div>
      </div>
    </div>
  );
}
