"use client"
import React, { useState } from 'react';

type ChatMessage = {
  user: string;
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    if (!message) return;
    const chatMessage: ChatMessage = {
      user: 'User',
      message,
    };
    setChatLog([...chatLog, chatMessage]);
    setMessage('');
    const response = await sendToChatGPT(chatMessage.message);
    const botChatMessage: ChatMessage = {
      user: 'ChatGPT',
      message: response,
    };
    setChatLog(prev => [...prev, botChatMessage]);
  };

  const sendToChatGPT = async (message: string): Promise<string> => {
    return "Hello! This is a mock message from ChatGPT.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-1/2">
        <div className="h-64 overflow-auto mb-4 border border-gray-200 rounded-md p-4">
          {chatLog.map((chat, index) => (
            <p key={index} className={`mb-2 ${chat.user === 'User' ? 'text-blue-500' : 'text-green-500'}`}><strong>{chat.user}:</strong> {chat.message}</p>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border border-gray-200 rounded-l-md p-2 mr-2"
          />
          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

