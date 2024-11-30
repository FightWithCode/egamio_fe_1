"use client";
import { Suspense } from 'react';
import { useState } from 'react';
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import Image from "next/image";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { FaEllipsisV, FaSearch, FaPaperclip, FaSmile } from "react-icons/fa";
import user2 from "@/public/images/users/user2.png";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, are you up for a game?",
      time: "2:30 PM",
      unread: 2,
      online: true,
      avatar: user2
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Good game yesterday!",
      time: "1:45 PM",
      unread: 0,
      online: false,
      avatar: user2
    },
    // Add more chats...
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hey, are you up for a game?",
      time: "2:30 PM",
      isSender: false
    },
    {
      id: 2,
      sender: "You",
      content: "Sure, what do you want to play?",
      time: "2:31 PM",
      isSender: true
    },
    // Add more messages...
  ];

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    setShowChatList(false);
  };

  return (
    <ResponsiveContainer className="h-[calc(100vh-75px)] pt-16 pb-16">
      <div className="h-full grid grid-cols-1 md:grid-cols-[350px,1fr] gap-4">
        {/* Chat List */}
        <div className={`bg-transparent backdrop-blur-md border-[1px] border-white/20 rounded-lg 
          ${!showChatList ? 'hidden md:block' : ''}`}>
          <div className="p-4 border-b border-white/20">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-background/50 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-highlight"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-250px)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-white/10
                  ${selectedChat === chat.id ? 'bg-highlight/20' : 'hover:bg-background/50'}`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-highlight text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className={`bg-transparent backdrop-blur-md border-[1px] border-white/20 rounded-lg flex flex-col
            ${showChatList ? 'hidden md:flex' : ''}`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/20 flex items-center gap-4">
              <button 
                className="md:hidden text-xl"
                onClick={() => setShowChatList(true)}
              >
                <IoArrowBack />
              </button>
              <div className="flex items-center flex-1 gap-3">
                <Image
                  src={user2}
                  alt="User"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
              <button className="p-2 hover:bg-background/50 rounded-full">
                <FaEllipsisV />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.isSender
                        ? 'bg-highlight text-white rounded-br-none'
                        : 'bg-background/50 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-background/50 rounded-full">
                  <FaSmile className="text-xl" />
                </button>
                <button className="p-2 hover:bg-background/50 rounded-full">
                  <FaPaperclip className="text-xl" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-background/50 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-highlight"
                />
                <button className="bg-highlight text-white p-3 rounded-lg hover:bg-darkhighlight transition-colors">
                  <IoSend size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`bg-transparent backdrop-blur-md border-[1px] border-white/20 rounded-lg flex items-center justify-center
            ${showChatList ? 'hidden md:flex' : ''}`}>
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-2">Select a chat to start messaging</h3>
              <p className="text-gray-400">Choose from your existing conversations</p>
            </div>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}
