"use client";

import { faFolder } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
  sender: string; // "me" or "other"
  text: string; // The content of the message
}

interface Chat {
  id: number;
  name: string;
  messages: Message[]; // Array of messages
}

const ChatSidebar = ({
  chats,
  onSelectChat,
}: {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}) => {
  return (
    <div className="min-w-[250px] bg-bg p-3 rounded-lg chat_box">
      <div className="flex items-center gap-2 mb-4">
        <div className="min-w-[48px] min-h-[48px] rounded-md bg-primary flex items-center justify-center">
          <FontAwesomeIcon icon={faFolder} className="fa_icons text-white" />
        </div>
        <p className="font-medium text-[17px] text-desc">Chats</p>
      </div>
      <div className="mb-6">
        <p className="font-medium text-[17px] text-desc mb-3">Bookmarked</p>
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSelectChat(chat)}
            >
              <div>{chat.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="font-medium text-[17px] text-desc mb-2">All Chats</p>
      </div>
    </div>
  );
};

export default ChatSidebar;