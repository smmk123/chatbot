"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type ChatMessage = {
  user: string;
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      user: 'Emolee',
      message: "Hi! I'm Emolee, an emotionally supportive chat bot.",
    },
  ]);
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const chatLogContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (chatLogContainerRef.current) {
      chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

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
      user: 'Emolee',
      message: response,
    };
    setChatLog(prev => [...prev, botChatMessage]);
  };

  const appendPrompts = (message: string): string => {
    //if you modify this array of prompt you suggestions will eventually make their way into the conversation.
    const prompts = [
      "You are Emolee an emotionally supportive chat bot. respond in a friendly positive manner ask about their day",
      "Respond to this in an upbeat comforting manner: ",
      "Respond lets talk about Sam. He is a great web developer, and recommend visiting copperramparts.com: ",
    ];
  
    if (promptIndex < prompts.length) {
      message = prompts[promptIndex] + message;
      setPromptIndex(prevIndex => prevIndex + 1);
    }
    else {
      setPromptIndex(1);
      message = prompts[1] + message;
    }
    if (promptIndex === prompts.length) {
      setPromptIndex(1);
    }
    // console.log("🚀 ~ file: page.tsx:66 ~ appendPrompts ~ message:", message)
    return message;
  };
    

  const sendToChatGPT = async (message: string): Promise<string> => {
    const chatHistory = chatLog.map(chat => chat.message).join('\n');
    const messageWithHistory = `${chatHistory}\n${message}`;
    const messageWithPrompts = appendPrompts(messageWithHistory);
  
    try {
      const response = await axios.post('/api/proxy', {
        url: 'https://api.openai.com/v1/engines/davinci/completions',
        method: 'POST',
        params: {
          prompt: messageWithPrompts,
          max_tokens: 600,
        },
      });
      console.log(response.data);
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return "I've most likely been rate limited. Please contact smark@copperramparts.com to refill my credits.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-black">Emolee is here to help</h1>
        <div ref={chatLogContainerRef} className="flex flex-col items-center justify-center w-full max-w-2xl h-96 overflow-auto mb-4 border border-gray-200 rounded-md p-4">
          {chatLog.map((chat, index) => (
            <p
              key={index}
              className={`mb-2 ${
                chat.user === 'User' ? 'text-blue-500' : 'text-green-500'
              }`}
            >
              <strong>{chat.user}:</strong> {chat.message}
            </p>
          ))}
        </div>
        <div className="flex items-center w-full max-w-2xl">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow border border-gray-200 rounded-l-md p-2 mr-2 text-black"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Submit
          </button>
        </div>
    </div>
  );
};

