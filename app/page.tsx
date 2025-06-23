'use client';

import { useChat } from 'ai/react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();

  const handleGenerateClick = () => {
    if (!input.trim()) return;
    append({ role: 'user', content: input });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            AI Chat Assistant
          </h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Send a message to the AI assistant:
              </label>
              <textarea
                id="message"
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={3}
                placeholder="Type your message here..."
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleGenerateClick}
                disabled={isLoading || !input.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate Response'}
              </button>
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            
            {messages.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Conversation:
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-md ${
                        message.role === 'user'
                          ? 'bg-blue-100 dark:bg-blue-900 ml-8'
                          : 'bg-gray-100 dark:bg-gray-700 mr-8'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {message.role === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>AI Chat Assistant powered by GPT-3.5 Turbo</p>
              <p>Press Enter to send, Shift+Enter for new line • Use Generate or Send buttons</p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <a 
                href="/dashboard" 
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm font-medium"
              >
                View Personal Assistant Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
