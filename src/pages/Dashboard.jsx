import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Activity, Brain, Calendar, Flame, Trophy, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    streak: 0,
    totalSessions: 0,
    quizScore: 0,
    timeSpent: 0
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('codetracker-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Code Editor',
      description: 'Practice coding with syntax highlighting and live preview',
      path: '/editor',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Activity,
      title: 'Activity Tracker',
      description: 'Track your daily coding progress and maintain streaks',
      path: '/activity',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'Programming Quiz',
      description: 'Test your knowledge with true/false questions',
      path: '/quiz',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CodeTracker</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your all-in-one platform for coding practice, progress tracking, and knowledge testing
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-white">{stats.streak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Code Sessions</p>
              <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Quiz Score</p>
              <p className="text-2xl font-bold text-white">{stats.quizScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time Spent</p>
              <p className="text-2xl font-bold text-white">{Math.round(stats.timeSpent / 60)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="group relative overflow-hidden bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              
              <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                Get Started
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/editor"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            Start Coding
          </Link>
          <Link
            to="/quiz"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            Take Quiz
          </Link>
          <Link
            to="/activity"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            View Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;