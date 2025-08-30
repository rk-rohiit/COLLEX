import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// Mock chat data
const mockChats = [
  {
    id: "1",
    buyerId: "2",
    sellerId: "1",
    listingId: "1",
    listingTitle: "Engineering Mathematics Textbook",
    lastMessage: "Is this still available?",
    lastMessageAt: "2024-01-20T16:30:00Z",
    unreadCount: 1,
    participants: {
      buyer: { id: "2", name: "Admin User" },
      seller: { id: "1", name: "Arjun Sharma" },
    },
  },
];

const mockMessages = {
  1: [
    {
      id: "1",
      chatId: "1",
      senderId: "2",
      senderName: "Admin User",
      text: "Hi! Is this textbook still available?",
      createdAt: "2024-01-20T16:25:00Z",
      readBy: ["2"],
    },
    {
      id: "2",
      chatId: "1",
      senderId: "1",
      senderName: "Arjun Sharma",
      text: "Yes, it is! The book is in excellent condition.",
      createdAt: "2024-01-20T16:27:00Z",
      readBy: ["1"],
    },
    {
      id: "3",
      chatId: "1",
      senderId: "2",
      senderName: "Admin User",
      text: "Is this still available?",
      createdAt: "2024-01-20T16:30:00Z",
      readBy: ["2"],
    },
  ],
};

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState(mockMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const createChat = async (listingId, sellerId) => {
    setLoading(true);
    try {
      const existingChat = chats.find(
        (chat) =>
          chat.listingId === listingId &&
          chat.buyerId === "1" && // Current user
          chat.sellerId === sellerId
      );

      if (existingChat) {
        return existingChat.id;
      }

      const newChat = {
        id: Date.now().toString(),
        buyerId: "1", // Current user
        sellerId,
        listingId,
        listingTitle: "Product Title", // Would fetch from listing
        unreadCount: 0,
        participants: {
          buyer: { id: "1", name: "Current User" },
          seller: { id: sellerId, name: "Seller Name" },
        },
      };

      setChats((prev) => [newChat, ...prev]);
      setMessages((prev) => ({ ...prev, [newChat.id]: [] }));

      return newChat.id;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (chatId, text, imageUrl) => {
    if (!text && !imageUrl) return;

    const newMessage = {
      id: Date.now().toString(),
      chatId,
      senderId: "1", // Current user
      senderName: "Current User",
      text,
      imageUrl,
      createdAt: new Date().toISOString(),
      readBy: ["1"],
    };

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: text || "Image",
              lastMessageAt: newMessage.createdAt,
              unreadCount: chat.buyerId === "1" ? 0 : chat.unreadCount + 1,
            }
          : chat
      )
    );
  };

  const markAsRead = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const getUnreadCount = () => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        activeChat,
        loading,
        createChat,
        sendMessage,
        setActiveChat,
        markAsRead,
        getUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
