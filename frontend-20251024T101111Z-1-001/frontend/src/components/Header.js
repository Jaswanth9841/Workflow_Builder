// Header.js - Top header bar component
import { useTheme } from '../context/ThemeContext';

export const Header = ({ onDocsClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div 
      className="px-6 py-4 flex items-center justify-between transition-all duration-300 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700"
      style={{
        background: isDark ? undefined : 'linear-gradient(to right, #6D28D9, #C026D3)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">🚀</div>
        <div>
          <h1 className="text-xl font-bold text-white">Mini Workflow Builder</h1>
          <p className="text-sm font-semibold text-white/90 dark:text-gray-300">Design, connect, and validate your pipeline</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <span className="text-2xl group-hover:rotate-12 transition-transform">☀️</span>
          ) : (
            <span className="text-2xl group-hover:-rotate-12 transition-transform">🌙</span>
          )}
        </button>
        
        <button 
          onClick={onDocsClick}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-all hover:scale-105"
        >
          📚 Docs
        </button>
      </div>
    </div>
  );
};

