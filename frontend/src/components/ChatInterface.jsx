import React, { useState, useRef, useEffect } from 'react';
import { apiClient } from '../services/apiService';
import { sampleQuestions } from '../services/sampleQuestions';

const SUBJECTS = [
  'Mathematics',
  'English',
  'Science',
  'History',
  'Chemistry',
  'Physics',
  'Biology',
];

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPresetQuestions, setShowPresetQuestions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePresetQuestion = (question) => {
    setSelectedSubject(question.subject);
    setSelectedTopic(question.topic);
    setInputValue(question.question);
    setShowPresetQuestions(false);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question.question,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: question.answer,
        responseTime: Math.random() * 2000 + 800,
        queryId: `sample-${question.id}`,
        rating: null,
        helpful: null,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedTopic.trim()) {
      setError('Please enter both topic and question');
      return;
    }

    setError('');
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiClient.submitQuery({
        subject: selectedSubject,
        topic: selectedTopic,
        question: inputValue,
        difficulty: 'Intermediate',
      });

      if (response.success) {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.query.aiResponse,
          responseTime: response.query.responseTime,
          queryId: response.query._id,
          rating: null,
          helpful: null,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(response.message || 'Failed to get response');
      }
    } catch (err) {
      setError('Error submitting question. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId, rating, helpful) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || !message.queryId) return;

    try {
      if (!message.queryId.startsWith('sample-')) {
        await apiClient.submitQueryFeedback(message.queryId, {
          rating,
          helpful,
        });
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === messageId ? { ...m, rating, helpful } : m
        )
      );
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">🤖 AI Homework Assistant</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {SUBJECTS.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <input
              type="text"
              placeholder="e.g., Quadratic Equations"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Messages & Preset Questions */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && showPresetQuestions && (
          <div className="space-y-4">
            <div className="text-center text-gray-600 mb-6">
              <p className="text-lg font-semibold mb-2">📚 Welcome to AI Homework Assistant</p>
              <p className="text-sm">Click any question below to see an instant answer!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => handlePresetQuestion(q)}
                  className="text-left p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg hover:shadow-md transition hover:border-indigo-400 cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl flex-shrink-0">
                      {q.subject === 'Mathematics' && '🔢'}
                      {q.subject === 'Science' && '🔬'}
                      {q.subject === 'English' && '📖'}
                      {q.subject === 'Physics' && '⚛️'}
                      {q.subject === 'History' && '🏛️'}
                      {q.subject === 'Chemistry' && '🧪'}
                      {q.subject === 'Biology' && '🧬'}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-indigo-600">{q.subject}</p>
                      <p className="text-xs text-gray-600 font-medium mb-1">{q.topic}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{q.question}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl ${
                message.type === 'user'
                  ? 'bg-indigo-600 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tr-lg rounded-br-lg rounded-tl-lg'
              } p-4`}
            >
              <p className="text-sm md:text-base break-words whitespace-pre-wrap">{message.content}</p>

              {message.type === 'ai' && (
                <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-500">
                    ⚡ Response time: {(message.responseTime / 1000).toFixed(2)}s
                  </p>

                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-600">Was this helpful?</span>
                    {message.helpful === null ? (
                      <>
                        <button
                          onClick={() => handleFeedback(message.id, 5, true)}
                          className="text-lg hover:scale-125 transition"
                          title="Helpful"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 2, false)}
                          className="text-lg hover:scale-125 transition"
                          title="Not helpful"
                        >
                          👎
                        </button>
                      </>
                    ) : message.helpful ? (
                      <span className="text-lg">👍</span>
                    ) : (
                      <span className="text-lg">👎</span>
                    )}
                  </div>

                  {message.rating !== null && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      Rating: {'⭐'.repeat(message.rating)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your homework question here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-semibold"
          >
            {isLoading ? 'Waiting...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
