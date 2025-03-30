"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseBlank, faComment, faMinus, faPlus, faStar, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import axiosInstance from '@/lib/axios/axios';
import { Chat } from '@/types/chat';
import { Workspace } from '@/types/workspace';

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [viewMore, setViewMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayedChats = viewMore ? chats : chats.slice(0, 3);

  useEffect(() => {
    fetchWorkspaces();
    fetchChats(); // Fetch chats on mount
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await axiosInstance.get('workspace/list');
      setWorkspaces(
        data.map((ws: Workspace) => ({
          _id: ws._id,
          name: ws.name,
          description: `${ws.documents.length} documents`,
          chats: `${ws.chats.length} Chats`
        }))
      );
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axiosInstance.post('chat/list');
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const createNewWorkspace = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/workspace/create', { name: "New workspace" });
      await fetchWorkspaces();
    } catch (error) {
      console.error('Error creating workspace:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    if (!confirm("Are you sure you want to delete this workspace?")) return;

    try {
      await axiosInstance.delete(`/workspace/delete/${workspaceId}`);
      await fetchWorkspaces();
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  return (
    <div className="flex flex-col flex-grow gap-4">
      <div className="flex flex-col flex-grow">
        <div className='flex items-center gap-4'>
          <h1>My workspaces</h1>
          <button className="btn_s" onClick={createNewWorkspace} disabled={loading}>
            <FontAwesomeIcon icon={faPlus} className="icons" />
            {loading ? 'Creating...' : 'Create new'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {workspaces.map((workspace) => (
          <Link href={`workspaces/workspace?id=${workspace._id}`} key={workspace._id}>
            <div className="card group relative p-3 border rounded-md duration-300">
              <div className="flex gap-2">
                <div className="min-w-[48px] min-h-[48px] rounded-md flex items-center justify-center bg-secondary">
                  <FontAwesomeIcon icon={faBriefcaseBlank} className="icons text-white text-h1" />
                </div>
                <div>
                  <h3 className="font-bold text-title mb-[12px] overflow-hidden whitespace-nowrap text-ellipsis max-w-[125px]">
                    {workspace.name}
                  </h3>
                  <p className="text-desc">{workspace.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-desc">{workspace.chats}</p>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="icons opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-600 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteWorkspace(workspace._id);
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>

      <div className=" flex-grow flex gap-3">
        <div className=" flex flex-grow w-1/2 flex-col gap-1">
          <div className="flex items-center gap-3 mb-2">
            <h1>Last chats</h1>
            <button className="btn_s">
              <FontAwesomeIcon icon={faPlus} className="icons" />
              Create new
            </button>
          </div>
          {displayedChats.map((chat) => (
                <Link
                href={`/workspaces/workspace/chat?id=${chat._id}`}
                key={chat._id}
                className="card group py-2 px-2 mb-1 cursor-pointer">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="min-w-[48px] min-h-[48px] rounded-md flex items-center justify-center bg-secondary">
                    <FontAwesomeIcon icon={faComment} className="icons text-white text-h1" />
                  </div>
                  <h3 className="font-bold text-title">{chat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
          <div
            className="card py-2 px-2 flex items-center gap-2 cursor-pointer"
            onClick={() => setViewMore(!viewMore)}
          >
            <div className="min-w-[48px] min-h-[48px] rounded-md flex items-center justify-center bg-primary">
            {viewMore ? <FontAwesomeIcon icon={faMinus} className="icons text-h1 text-white" /> : <FontAwesomeIcon icon={faPlus} className="icons text-h1 text-white" />}
            </div>
            <h3> {viewMore ? "View less..." : "View more..."}</h3>
          </div>
        </div>
        <div className='flex flex-grow w-1/2 flex-col'>
          <div className="flex items-center gap-3 mb-5">
            <h1>Generate documents</h1>
          </div>
          <div className="gap-3 bg-bg flex flex-grow rounded-[24px] p-[24px]">
            <Link
              href="/workspaces/workspace/fill-template"
              className="p-[24px] rounded-[24px] bg-secondary flex flex-grow w-1/2 items-center justify-center border-2 border-[#e5e7eb] transition-all duration-[0.5s] ease-in-out hover:bg-secondary"
            >
              <FontAwesomeIcon color="white" icon={faStar} className="icons  mr-2" />
              <p className="text-white">Fill a template</p>
            </Link>
            <Link
              href="/workspaces/workspace/generate-document"
              className="p-[24px] rounded-[24px] bg-secondary flex flex-grow w-1/2 items-center justify-center border-2 border-[#e5e7eb] transition-all duration-[0.5s] ease-in-out hover:bg-secondary"
            >
              <FontAwesomeIcon color="white" icon={faStar} className="icons  mr-2" />
              <p className="text-white">Generate a full document</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}