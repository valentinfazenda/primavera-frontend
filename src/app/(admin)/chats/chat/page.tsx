"use client"; // Important for client-side component

import user from "@/assets/svg/logo.svg";
import TreeFile from "@/components/chats/chats-treefile.component";
import { faArrowLeft, faPaperPlane } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Message {
  sender: string;
  text: string;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = { sender: "me", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, newMsg]);

    const reply = generateReply(newMessage);
    if (reply) {
      setMessages((prevMessages) => [...prevMessages, reply]);
    }

    setNewMessage("");
  };

  const generateReply = (userMessage: string): Message | null => {
    const trimmedMessage = userMessage.toLowerCase().trim();
    if (trimmedMessage === "hi" || trimmedMessage === "hello") {
      return { sender: "other", text: "Hello! How can I assist you today?" };
    } else if (
      trimmedMessage === "how are you?" ||
      trimmedMessage === "how are you"
    ) {
      return { sender: "other", text: "I'm just a bot, but I'm here to help!" };
    }
    return null;
  };

  return (
    <div className="h-[80vh]">
      <Link
        href="\workspaces\workspace"
        className="flex items-center gap-2"
      >
        <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
          <FontAwesomeIcon icon={faArrowLeft} className="icons text-white" />
        </div>
        <h3>Chat Lorem Ipsum</h3>
      </Link>
      <div className="flex gap-3 justify-between mt-4 chat_box">
        <div className="bg-bg p-3 rounded-md chat_box">
          <div className="flex items-center gap-2">
            <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="icons text-white"
              />
            </div>
            <div>
              <p>Documents</p>
              <h3>3</h3>
            </div>
          </div>
          <p className="my-3">Documents list</p>
          <TreeFile />
        </div>
        <div className="w-full p-[16px] flex flex-col justify-between bg-bg rounded-lg pb-2 chat_box">
          <div className="overflow-y-auto h-80">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
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
                        alt="User image"
                        className="w-[30px] h-[30px] rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={user}
                        alt="User image"
                        className="w-[30px] h-[30px] rounded-full object-cover"
                      />
                      <p className="bg-bg text-title p-2 rounded-md shadow-md">
                        {msg.text}
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg">Type a message to start chatting.</p>
            )}
          </div>
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
      </div>
    </div>
  );
};

export default Page;
