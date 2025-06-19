import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const Quiz = () => {
  const [questions] = useState([
    {
      id: 1,
      question: "JavaScript is a statically typed language.",
      answer: false,
      explanation: "JavaScript is dynamically typed, meaning variable types are determined at runtime.",
      category: "JavaScript"
    },
    {
      id: 2,
      question: "React components must return a single parent element.",
      answer: false,
      explanation: "React 16+ allows returning multiple elements using Fragments or arrays.",
      category: "React"
    },
    {
      id: 3,
      question: "CSS Grid is a one-dimensional layout method.",
      answer: false,
      explanation: "CSS Grid is two-dimensional, while Flexbox is one-dimensional.",
      category: "CSS"
    },
    {
      id: 4,
      question: "The 'let' keyword in JavaScript has block scope.",
      answer: true,
      explanation: "Variables declared with 'let' are block-scoped, unlike 'var' which is function-scoped.",
      category: "JavaScript"
    },
    {
      id: 5,
      question: "HTML5 introduced semantic elements like <header> and <footer>.",
      answer: true,
      explanation: "HTML5 added many semantic elements to improve document structure and accessibility.",
      category: "HTML"
    },
    {
      id: 6,
      question: "Python uses indentation to define code blocks.",
      answer: true,
      explanation: "Python uses indentation (whitespace) instead of braces to define code blocks.",
      category: "Python"
    },
    {
      id: 7,
      question: "JSON stands for JavaScript Object Notation.",
      answer: true,
      explanation: "JSON (JavaScript Object Notation) is a lightweight data interchange format.",
      category: "General"
    },
    {
      id: 8,
      question: "Git and GitHub are the same thing.",
      answer: false,
      explanation: "Git is a version control system, while GitHub is a hosting service for Git repositories.",
      category: "Git"
    },
    {
      id: 9,
      question: "TypeScript is a superset of JavaScript.",
      answer: true,
      explanation: "TypeScript adds static typing to JavaScript and compiles to plain JavaScript.",
      category: "TypeScript"
    },
    {
      id: 10,
      question: "CSS Flexbox cannot center items both horizontally and vertically.",
      answer: false,
      explanation: "Flexbox can easily center items in both directions using justify-content and align-items.",
      category: "CSS"
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    
    // Update stats
    const stats = JSON.parse(localStorage.getItem('codetracker-stats') || '{}');
    const percentage = Math.round((score / questions.length) * 100);
    const updatedStats = {
      ...stats,
      quizScore: Math.max(stats.quizScore || 0, percentage)
    };
    localStorage.setItem('codetracker-stats', JSON.stringify(updatedStats));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <div className="mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h1>
            <p className="text-gray-300">Great job on finishing the programming quiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-1">Your Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                {score}/{questions.length}
              </p>
            </div>
            
            <div className="bg-black/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-1">Percentage</p>
              <p className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                {percentage}%
              </p>
            </div>
            
            <div className="bg-black/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-1">Grade</p>
              <p className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                {percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'F'}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-white">Review Your Answers</h2>
            <div className="grid gap-4">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.answer;
                
                return (
                  <div key={question.id} className="bg-black/30 rounded-lg p-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.question}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-400">
                            Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                              {userAnswer === null ? 'Not answered' : userAnswer ? 'True' : 'False'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-400">
                              Correct answer: <span className="text-green-400">
                                {question.answer ? 'True' : 'False'}
                              </span>
                            </p>
                          )}
                          <p className="text-gray-300">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Programming Quiz</h1>
              <p className="text-gray-300">Test your programming knowledge</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-gray-400 text-sm">Question</p>
            <p className="text-2xl font-bold text-white">
              {currentQuestionIndex + 1}/{questions.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="mb-6">
          <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mb-4">
            {currentQuestion.category}
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {currentQuestion.question}
          </h2>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(true)}
              className="w-full p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl text-white hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                  T
                </div>
                <span className="text-lg font-semibold">True</span>
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="w-full p-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">
                  F
                </div>
                <span className="text-lg font-semibold">False</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border-2 ${
              selectedAnswer === currentQuestion.answer 
                ? 'bg-green-500/20 border-green-500/50' 
                : 'bg-red-500/20 border-red-500/50'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                {selectedAnswer === currentQuestion.answer ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <span className={`text-lg font-semibold ${
                  selectedAnswer === currentQuestion.answer ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedAnswer === currentQuestion.answer ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
              
              <div className="space-y-2 text-white">
                <p>Your answer: <span className="font-semibold">{selectedAnswer ? 'True' : 'False'}</span></p>
                <p>Correct answer: <span className="font-semibold">{currentQuestion.answer ? 'True' : 'False'}</span></p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-blue-300 font-semibold mb-2">Explanation</h3>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                Score: {score}/{currentQuestionIndex + 1}
              </div>
              
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;