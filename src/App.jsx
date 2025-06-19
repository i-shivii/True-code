import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CodeEditor from './pages/CodeEditor';
import ActivityTracker from './pages/ActivityTracker';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path="/activity" element={<ActivityTracker />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;