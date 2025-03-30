"use client";
import user from "@/assets/svg/logo.svg";
import { faPaperPlane } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Message {
  sender: string; // "me" or "other"
  text: string; // The content of the message
}

interface Chat {
  id: number;
  name: string;
  messages: Message[]; // Array of messages
}

const ChatSection = ({
  selectedChat,
  onUpdateChat,
}: {
  selectedChat: Chat | null;
  onUpdateChat: (chat: Chat) => void;
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    const newMsg: Message = { sender: "me", text: newMessage };

    // If there is no selected chat, create a new chat
    if (!selectedChat) {
      const newChat: Chat = {
        id: Date.now(), // Unique ID based on timestamp
        name: "New Chat", // Default name for new chat
        messages: [newMsg],
      };
      onUpdateChat(newChat); // Notify parent about the new chat
    } else {
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
      };
      onUpdateChat(updatedChat); // Notify parent about the update
    }

    setNewMessage(""); // Clear the input
  };

  // Function to generate a reply
  const generateReply = (userMessage: string) => {
    const trimmedMessage = userMessage.toLowerCase().trim();
    if (trimmedMessage === "hi" || trimmedMessage === "hello") {
      return { sender: "other", text: "Hello! How can I assist you today?" };
    } else if (
      trimmedMessage === "how are you?" ||
      trimmedMessage === "how are you"
    ) {
      return { sender: "other", text: "I'm just a bot, but I'm here to help!" };
    }
    return null; // No predefined reply
  };

  // Effect to handle automatic replies
  useEffect(() => {
    if (selectedChat && selectedChat.messages.length > 0) {
      const lastMessage =
        selectedChat.messages[selectedChat.messages.length - 1];
      const reply = generateReply(lastMessage.text);
      if (reply) {
        const updatedChat = {
          ...selectedChat,
          messages: [...selectedChat.messages, reply],
        };
        onUpdateChat(updatedChat);
      }
    }
  }, [selectedChat, onUpdateChat]);

  return (
    <div className="w-full p-[16px] flex flex-col justify-between bg-bg rounded-lg pb-2 chat_box">
      <div className="overflow-y-auto">
        {selectedChat ? (
          selectedChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 mb-2 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "me" ? (
                <>
                  <p className="bg-bg text-title p-2 rounded-md shadow-md">
                    {msg.text}
                  </p>
                  <Image
                    src={user}
                    alt="img"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={user}
                    alt="img"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                  <p className="bg-bg text-title p-2 rounded-md shadow-md">{msg.text}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg">Type a message to start chatting.</p>
        )}
      </div>
      {/* Input field is always visible */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type something..."
        />
        <button
          onClick={handleSendMessage}
          className="w-[48px] h-[48px] bg-primary text-white rounded-lg"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="icons w-[30px]" />
        </button>
      </div>
    </div>
  );
  
};

export default ChatSection;
