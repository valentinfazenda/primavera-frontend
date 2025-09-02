"use client"; // Important for client-side component

import user from "@/assets/svg/logo.svg";
import logo from "@/assets/svg/logo.svg";
import { faArrowLeft, faFolder, faPaperPlane } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import axiosInstance from "@/lib/axios/instance";
import TreeFile from "@/components/chats/chats-treefile.component";
import WebSocketService from "@/lib/websocket/websocket";
import { WebSocketResponse } from "@/types/websocketResponse";

interface Message {
  _id: string;
  chatId: string;
  text: string;
  creationDate: string;
  sender?: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatName, setChatName] = useState<string>("");
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');

  const websocketServiceRef = useRef<WebSocketService | null>(null);
  const agentMessageIdRef = useRef<string | null>(null); // Store the agent's message ID

  // Fetch chat details and messages on component mount
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        // Make the API call to fetch chat details and messages
        const response = await axiosInstance.post("/chat/details", {
          chatId: chatId
        });

        // Update the chat name and messages in state
        const { chat, messages } = response.data;
        setChatName(chat.name);
        setMessages(messages);
        setWorkspaceId(chat.workspaceId);
      } catch (error) {
        console.error("Failed to fetch chat details:", error);
      }
    };

    if (chatId) {
      fetchChatDetails();
    }

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      websocketServiceRef.current?.close();
      websocketServiceRef.current = null;
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    // Retrieve the token for WebSocket connection
    const token = Cookies.get('token');
    if (!token) {
      console.error('WebSocket token not found');
      return;
    }

    // Create WebSocket connection only if it doesn't already exist
    if (!websocketServiceRef.current) {
      websocketServiceRef.current = new WebSocketService(token);
      websocketServiceRef.current.connect();
    }

    // User message in the UI
    const userMessage: Message = {
      _id: `user-${Date.now()}`,
      chatId: chatId || "",
      text: newMessage,
      creationDate: new Date().toISOString(),
      sender: "user",
    };

    // Add the user message to the list
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the message via WebSocket
      websocketServiceRef.current.sendMessage({
        chatId: chatId,
        message: newMessage,
      });

      // Listen to messages received via WebSocket
      websocketServiceRef.current.onMessage((msg: WebSocketResponse) => {
        // If it's the first response, create a new message for the agent
        if (!agentMessageIdRef.current && msg.type == 'message') {
          const agentMessage: Message = {
            _id: `agent-${Date.now()}`,
            chatId: chatId || "",
            text: msg.response?.text || "",
            creationDate: new Date().toISOString(),
            sender: "agent",
          };

          // Add the agent's message
          agentMessageIdRef.current = agentMessage._id;
          setMessages((prevMessages) => [...prevMessages, agentMessage]);
        } else if (msg.type == 'message') {

          // Replace the agent's text with the new response
          setMessages((prevMessages) =>
            prevMessages.map((message) =>
              message._id === agentMessageIdRef.current
                ? { ...message, text: msg.response?.text || "" }
                : message
            )
          );
        }
        else {
          console.log('Received message:',
            msg.response?.text,
            'with status:', msg.status,
            'and step:', msg.response?.step,
            'and type:', msg.type);
        }

        // Check the response status to close the connection
        if (msg.status === 'done' && msg.type === 'message') {
          websocketServiceRef.current?.close();
          websocketServiceRef.current = null;
          agentMessageIdRef.current = null; // Reset the agent message ID
          console.log('WebSocket connection closed after receiving "done" status.');
        }
      });

      // Clear the input field after sending
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message via WebSocketService:', error);
      
      // Close the WebSocket connection in case of error
      websocketServiceRef.current?.close();
      websocketServiceRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-grow flex flex-col">
        <Link href={`/workspaces/workspace?id=${workspaceId}`} className="flex items-center gap-2">
        <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
          <FontAwesomeIcon icon={faArrowLeft} className="icons text-white" />
        </div>
        <h3>{chatName || "Chat"}</h3> {/* Display the chat name */}
      </Link>
      <div className="flex flex-grow gap-3 justify-between mt-4 chat_box">
        <div className="bg-bg p-3 rounded-md chat_box">
          <div className="flex items-center gap-2">
            <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
              <FontAwesomeIcon icon={faFolder} className="icons text-white" />
            </div>
            <div>
              <p>Documents</p>
              <h3>3</h3>
            </div>
          </div>
          <p className="my-3">Documents list</p>
          <TreeFile />
        </div>
        <div className="w-full h-[757px] p-[16px] flex flex-col justify-between bg-bg rounded-lg pb-2 chat_box">
          <div className="overflow-y-auto flex-grow">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id} // Ensure each message has a unique key
                  className={`flex items-start gap-2 mb-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <>
                      <div className="bg-body text-title p-2 rounded-md shadow-md">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                      <Image
                        src={user}
                        alt="User image"
                        className="w-[30px] h-[30px] rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={logo}
                        alt="Agent image"
                        className="w-[30px] h-[30px] rounded-full object-contain"
                      />
                      <div className="bg-body text-title p-2 rounded-md shadow-md">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
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
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type something..."
            />
            <button
              onClick={handleSendMessage}
              className="w-[48px] h-[48px] bg-bgimage text-white rounded-lg"
            >
              <FontAwesomeIcon color='black' icon={faPaperPlane} className="icons w-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapping ChatPage with Suspense to handle useSearchParams
export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat details...</div>}>
      <ChatPage />
    </Suspense>
  );
}
