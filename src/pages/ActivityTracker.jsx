import React, { useState, useEffect } from 'react';
import { Calendar, Flame, Trophy, Clock, Code, TrendingUp } from 'lucide-react';

const ActivityTracker = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    streak: 0,
    totalSessions: 0,
    timeSpent: 0,
    lastCodingDate: ''
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('codetracker-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedActivities = localStorage.getItem('codetracker-activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const generateCalendarData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const activity = activities.find(a => 
        new Date(a.date).toDateString() === date.toDateString()
      );
      
      data.push({
        date: date.toDateString(),
        sessions: activity ? activity.sessions : 0,
        timeSpent: activity ? activity.timeSpent : 0
      });
    }
    
    return data;
  };

  const getActivityLevel = (sessions) => {
    if (sessions === 0) return 'bg-gray-800';
    if (sessions === 1) return 'bg-green-900';
    if (sessions === 2) return 'bg-green-700';
    if (sessions >= 3) return 'bg-green-500';
    return 'bg-gray-800';
  };

  const calendarData = generateCalendarData();
  const weeks = [];
  
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  const recentActivities = [
    { date: '2024-01-15', type: 'Coding Session', duration: '2h 30m', language: 'JavaScript' },
    { date: '2024-01-14', type: 'Quiz Completed', score: '8/10', topic: 'React Hooks' },
    { date: '2024-01-13', type: 'Coding Session', duration: '1h 45m', language: 'Python' },
    { date: '2024-01-12', type: 'Quiz Completed', score: '9/10', topic: 'Algorithms' },
    { date: '2024-01-11', type: 'Coding Session', duration: '3h 15m', language: 'TypeScript' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Activity Tracker</h1>
        <p className="text-gray-300">Monitor your coding progress and maintain your streak</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{stats.streak}</p>
              <p className="text-sm text-gray-400">Day Streak</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
              style={{ width: `${Math.min((stats.streak / 30) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
              <p className="text-sm text-gray-400">Total Sessions</p>
            </div>
          </div>
          <p className="text-green-400 text-sm">↗ +12% from last week</p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{Math.round(stats.timeSpent / 60)}h</p>
              <p className="text-sm text-gray-400">Time Spent</p>
            </div>
          </div>
          <p className="text-green-400 text-sm">↗ +5h from last week</p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-sm text-gray-400">Consistency</p>
            </div>
          </div>
          <p className="text-green-400 text-sm">↗ +3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Calendar */}
        <div className="lg:col-span-2 bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Activity Calendar</h2>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-900"></div>
                <div className="w-3 h-3 rounded-sm bg-green-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="grid grid-cols-53 gap-1 overflow-x-auto">
            {calendarData.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${getActivityLevel(day.sessions)} hover:scale-110 transition-transform cursor-pointer`}
                title={`${day.date}: ${day.sessions} sessions, ${Math.round(day.timeSpent / 60)}h`}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-white/10 last:border-b-0">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{activity.type}</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                  {activity.duration && (
                    <p className="text-sm text-gray-300">Duration: {activity.duration}</p>
                  )}
                  {activity.language && (
                    <p className="text-sm text-gray-300">Language: {activity.language}</p>
                  )}
                  {activity.score && (
                    <p className="text-sm text-gray-300">Score: {activity.score}</p>
                  )}
                  {activity.topic && (
                    <p className="text-sm text-gray-300">Topic: {activity.topic}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="mt-8 bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Weekly Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Coding Sessions</span>
              <span className="text-white font-semibold">5/7</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '71%' }} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Quiz Attempts</span>
              <span className="text-white font-semibold">3/5</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Hours Coded</span>
              <span className="text-white font-semibold">12/15h</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;