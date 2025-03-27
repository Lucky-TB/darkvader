export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-space font-bold text-purple-500 mb-4">DarkVader</h3>
            <p className="text-gray-400">
              Interactive galaxy simulation demonstrating the effects of dark matter on galactic structure and dynamics.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-space font-bold text-purple-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-purple-500 transition-colors">
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="/simulation" className="text-gray-400 hover:text-purple-500 transition-colors">
                  🌌 Simulation
                </a>
              </li>
              <li>
                <a href="/simulation/data" className="text-gray-400 hover:text-purple-500 transition-colors">
                  📊 Data Analysis
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-space font-bold text-purple-500 mb-4">Contact</h3>
            <p className="text-gray-400">
              Questions or feedback? Reach out to us at{' '}
              <a href="mailto:contact@darkvader.com" className="text-purple-500 hover:text-purple-400 transition-colors">
                contact@darkvader.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <p className="text-gray-400">© {new Date().getFullYear()} DarkVader. All rights reserved.</p>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-sm font-space font-semibold text-purple-500 mb-2">Simulation Controls</h4>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="text-green-500">🖱️</span> Left Click + Drag
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-500">🔍</span> Scroll to Zoom
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-500">⚙️</span> Sliders for Parameters
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-500">🔄</span> Right Click to Reset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 