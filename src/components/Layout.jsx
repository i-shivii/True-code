import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code, Activity, Brain, Home } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CodeTracker</span>
            </div>
            
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink
                to="/editor"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Code className="w-4 h-4" />
                <span>Code Editor</span>
              </NavLink>
              
              <NavLink
                to="/activity"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Activity className="w-4 h-4" />
                <span>Activity</span>
              </NavLink>
              
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Brain className="w-4 h-4" />
                <span>Quiz</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;