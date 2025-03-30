"use client";
import ChatSection from "@/components/chats/chats-section.component";
import ChatSidebar from "@/components/chats/chats-sidebar.component";
import React, { useState } from "react";

interface Message {
  sender: string; // "me" or "other"
  text: string; // The content of the message
}

interface Chat {
  id: number;
  name: string;
  messages: Message[]; // Array of messages
}

export default function Page() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Chat 1",
      messages: [
        { sender: "other", text: "Hello from Chat 1" },
        { sender: "other", text: "How can I assist you?" },
      ],
    },
    {
      id: 2,
      name: "Chat 2",
      messages: [
        { sender: "other", text: "Hi from Chat 2!" },
        { sender: "other", text: "Need some legal advice?" },
      ],
    },
    {
      id: 3,
      name: "Chat 3",
      messages: [
        { sender: "other", text: "Welcome to Chat 3" },
        { sender: "other", text: "We’re here to help!" },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleUpdateChat = (updatedChat: Chat) => {
    // Check if the chat already exists
    const existingChatIndex = chats.findIndex(chat => chat.id === updatedChat.id);
    
    if (existingChatIndex > -1) {
      // If the chat exists, update it
      setChats((prevChats) =>
        prevChats.map((chat, index) =>
          index === existingChatIndex ? updatedChat : chat
        )
      );
    } else {
      // If it doesn't exist, add a new chat
      setChats((prevChats) => [...prevChats, updatedChat]);
    }

    setSelectedChat(updatedChat); // Update the selected chat after a new message
  };

  return (
    <div className="flex items-start gap-3 chat_screen">
      <ChatSidebar chats={chats} onSelectChat={setSelectedChat} /> {/* Pass the chat list */}
      <ChatSection selectedChat={selectedChat} onUpdateChat={handleUpdateChat} /> {/* Update chat messages */}
    </div>
  );
}
