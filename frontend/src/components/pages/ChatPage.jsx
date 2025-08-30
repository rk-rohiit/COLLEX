import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Image, MoreVertical } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

export function ChatPage() {
  const {
    chats,
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    markAsRead,
  } = useChat();
  const { userProfile } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const activeChatData = chats.find((chat) => chat.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  useEffect(() => {
    if (activeChat) {
      markAsRead(activeChat);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, chatMessages, markAsRead]);

  const handleSendMessage = async () => {
    if (!activeChat || (!newMessage.trim() && !selectedImage)) return;

    await sendMessage(
      activeChat,
      newMessage.trim(),
      selectedImage || undefined
    );
    setNewMessage("");
    setSelectedImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!activeChat) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex h-96 md:h-[600px]">
            {/* Chat List */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Messages
                </h2>
                <p className="text-sm text-gray-600">
                  {chats.length} conversations
                </p>
              </div>
              <div className="overflow-y-auto h-full">
                {chats.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-gray-400 text-xl">💬</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      No conversations yet
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Start browsing items to begin chatting with sellers
                    </p>
                  </div>
                ) : (
                  chats.map((chat) => {
                    const otherParticipant =
                      chat.buyerId === userProfile?.id
                        ? chat.participants.seller
                        : chat.participants.buyer;
                    return (
                      <div
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {otherParticipant.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {otherParticipant.name}
                              </p>
                              {chat.unreadCount > 0 && (
                                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {chat.unreadCount}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 truncate mb-1">
                              {chat.listingTitle}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Empty State */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-96 md:h-[600px]">
          {/* Chat List */}
          <div
            className={`${
              activeChat ? "hidden md:block" : "block"
            } w-full md:w-1/3 border-r border-gray-200`}
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <p className="text-sm text-gray-600">
                {chats.length} conversations
              </p>
            </div>
            <div className="overflow-y-auto h-full">
              {chats.map((chat) => {
                const otherParticipant =
                  chat.buyerId === userProfile?.id
                    ? chat.participants.seller
                    : chat.participants.buyer;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      activeChat === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {otherParticipant.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {otherParticipant.name}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">
                          {chat.listingTitle}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className={`${
              !activeChat ? "hidden md:flex" : "flex"
            } flex-1 flex-col`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveChat(null)}
                  className="md:hidden p-1 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {activeChatData?.participants.seller.name.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {activeChatData?.participants.seller.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {activeChatData?.listingTitle}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-400 text-xl">👋</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Start the conversation!
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Ask about the item, negotiate price, or arrange pickup
                  </p>
                </div>
              ) : (
                chatMessages.map((message, index) => {
                  const isOwn = message.senderId === userProfile?.id;
                  const prevMessage = chatMessages[index - 1];
                  const showDate =
                    !prevMessage ||
                    formatDate(message.createdAt) !==
                      formatDate(prevMessage.createdAt);

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="text-center my-4">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      )}
                      <div
                        className={`flex ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md ${
                            isOwn ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwn
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {message.imageUrl && (
                              <img
                                src={message.imageUrl}
                                alt="Shared"
                                className="w-full rounded-lg mb-2 max-w-48"
                              />
                            )}
                            {message.text && (
                              <p className="text-sm">{message.text}</p>
                            )}
                          </div>
                          <p
                            className={`text-xs text-gray-500 mt-1 ${
                              isOwn ? "text-right" : "text-left"
                            }`}
                          >
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              {selectedImage && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Image className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() && !selectedImage}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
