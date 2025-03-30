"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseBlank, faPlus, faTrashAlt } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import { Workspace } from "@/types/workspace";
import axiosInstance from "@/lib/axios/axios";
import Selector from "@/components/select/select.component";

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState<string>("1");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const options = [
    { value: "1", label: "This Month" },
    { value: "2", label: "10 days" },
    { value: "3", label: "Last 30 days" },
  ];

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await axiosInstance.get('workspace/list');
      setWorkspaces(data.map((ws: Workspace) => ({
        ...ws,
        description: `${ws.documents.length} documents`,
        chats: `${ws.chats.length} Chats`
      })));
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    if (!confirm("Are you sure you want to delete this workspace?")) return;

    try {
      // Send DELETE request to the server
      await axiosInstance.delete(`/workspace/delete/${workspaceId}`);
      // Refetch the workspace list after deletion
      await fetchWorkspaces();
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="flex-grow">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1>My workspaces</h1>
        <div className="w-[150px]">
          <Selector
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {/* Create New Workspace Card */}
        <div className="card flex items-center cursor-pointer p-4 border rounded-md">
          <div className="flex items-center gap-2">
            <div className="min-w-[70px] min-h-[70px] rounded-md flex items-center justify-center bg-primary">
              <FontAwesomeIcon
                icon={faPlus}
                className="icons text-white text-h1"
              />
            </div>
            <h3 className="font-bold text-title">Create New Workspace</h3>
          </div>
        </div>

        {/* Display workspaces dynamically fetched from API */}
        {workspaces.map((workspace) => (
          <Link href={`workspaces/workspace?id=${workspace._id}`} key={workspace._id}>
            <div className="card group relative p-3 border rounded-md duration-300">
              <div className="flex gap-2">
                <div className="min-w-[48px] min-h-[48px] rounded-md flex items-center justify-center bg-primary">
                  <FontAwesomeIcon
                    icon={faBriefcaseBlank}
                    className="icons text-white text-h1"
                  />
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
  );
}
