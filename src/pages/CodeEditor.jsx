import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Save, RefreshCw, Settings } from 'lucide-react';

const CodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to CodeTracker!
// Start coding and track your progress

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}
`);
  
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Save session data
    return () => {
      const stats = JSON.parse(localStorage.getItem('codetracker-stats') || '{}');
      const updatedStats = {
        ...stats,
        totalSessions: (stats.totalSessions || 0) + 1,
        timeSpent: (stats.timeSpent || 0) + sessionTime,
        streak: updateStreak(stats.lastCodingDate)
      };
      updatedStats.lastCodingDate = new Date().toDateString();
      localStorage.setItem('codetracker-stats', JSON.stringify(updatedStats));
    };
  }, [sessionTime]);

  const updateStreak = (lastDate) => {
    if (!lastDate) return 1;
    
    const today = new Date();
    const last = new Date(lastDate);
    const diffTime = Math.abs(today.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      const stats = JSON.parse(localStorage.getItem('codetracker-stats') || '{}');
      return (stats.streak || 0) + 1;
    } else if (diffDays === 0) {
      const stats = JSON.parse(localStorage.getItem('codetracker-stats') || '{}');
      return stats.streak || 1;
    } else {
      return 1;
    }
  };

  const runCode = () => {
    if (language === 'javascript') {
      try {
        // Create a console mock to capture output
        let consoleOutput = [];
        const mockConsole = {
          log: (...args) => {
            consoleOutput.push(args.map(arg => String(arg)).join(' '));
          }
        };
        
        // Execute the code with mock console
        const func = new Function('console', code);
        func(mockConsole);
        
        setOutput(consoleOutput.join('\n') || 'Code executed successfully!');
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
    } else {
      setOutput('Code execution is currently supported for JavaScript only.');
    }
  };

  const saveCode = () => {
    localStorage.setItem('codetracker-saved-code', JSON.stringify({
      code,
      language,
      timestamp: new Date().toISOString()
    }));
    setOutput('Code saved successfully!');
  };

  const loadSavedCode = () => {
    const saved = localStorage.getItem('codetracker-saved-code');
    if (saved) {
      const { code: savedCode, language: savedLanguage } = JSON.parse(saved);
      setCode(savedCode);
      setLanguage(savedLanguage);
      setOutput('Saved code loaded!');
    } else {
      setOutput('No saved code found.');
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Code Editor</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>Session Time:</span>
              <span className="font-mono bg-black/30 px-2 py-1 rounded">
                {formatTime(sessionTime)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black/30 text-white px-3 py-2 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-black/30 text-white px-3 py-2 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none"
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 relative">
          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true }
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/3 bg-black/30 border-l border-white/10 flex flex-col">
          <div className="px-4 py-3 bg-black/20 border-b border-white/10">
            <h3 className="text-white font-semibold">Output</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {output || 'Run your code to see output here...'}
            </pre>
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={runCode}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Run Code</span>
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={saveCode}
                className="flex-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              
              <button
                onClick={loadSavedCode}
                className="flex-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-2 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center justify-center space-x-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Load</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;