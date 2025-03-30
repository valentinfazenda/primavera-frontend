"use client";
import axiosInstance from "@/lib/axios/axios";
import { Chat } from "@/types/chat";
import { Document } from "@/types/documents";
import {
  faArrowUpFromBracket,
  faComment,
  faComments,
  faDownToLine,
  faFile,
  faFilePen,
  faFolders,
  faMinus,
  faPlus,
  faSparkles,
  faSpinner,
  faTrashAlt,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";

function WorkspacePage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [viewMore, setViewMore] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const workspaceId = searchParams.get("id");

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (workspaceId) {
          const response = await axiosInstance.post("workspace/details", {
            id: workspaceId,
          });
          setChats(response.data.chats);
          setDocuments(response.data.documents);
        }
      } catch (error) {
        console.error("Error fetching workspace details:", error);
      }
    };
    fetchWorkspaceDetails();

    checkAndSynchronize();
  }, [workspaceId]);

  const checkAndSynchronize = async () => {
    try {
      // Fetch the latest document details
      const response = await axiosInstance.post("workspace/details", {
        id: workspaceId,
      });
      const docs = response.data.documents;

      // Check if all documents are processed
      const unprocessedDocs = docs.some(
        (doc: Document) => doc.status !== "processed"
      );
      setDocuments(docs);
      if (!unprocessedDocs) {
        console.log("All documents are processed. Clearing interval.");
        setDocuments(docs);
        return;
      } else {
        console.log(
          "Not all documents are processed. Triggering synchronization."
        );
        await axiosInstance.post("/documents/synchronize", { workspaceId });
        setTimeout(checkAndSynchronize, 5000);
      }
    } catch (error) {
      console.error("Error during automatic synchronization:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await axiosInstance.delete(`chat/delete/${chatId}`);
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await axiosInstance.delete(`documents/delete/${documentId}`);
      setDocuments((prevDocuments) =>
        prevDocuments.filter((document) => document._id !== documentId)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert("Please select a file or folder to upload.");
      return;
    }
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      setUploading(true);

      try {
        const addDocumentResponse = await axiosInstance.post("/documents/add", {
          fileName: file.name,
          workspaceId,
        });

        const { id: documentId } = addDocumentResponse.data;
        const presignedUrlResponse = await axiosInstance.post(
          "/documents/generate-presigned-url",
          {
            fileName: documentId,
            fileType: file.type,
            workspaceId,
            title: file.name,
          }
        );

        const presignedUrl = presignedUrlResponse.data.url;

        await fetch(presignedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        console.log(`${file.name} uploaded successfully to S3.`);
        setUploading(false);
        checkAndSynchronize();
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploading(false);
      }
    }
  };

  const handleDownloadDocument = async (documentId: string) => {
    try {
        // Request the download endpoint
        const response = await axiosInstance.get(`/documents/download-fulltext/${documentId}`, {
            responseType: 'blob', // Ensures the response is in a downloadable format (Blob)
        });

        // Create a downloadable link
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/plain' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'fulltext.txt'); // File name
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading document:", error);
    }
};

  const createNewChat = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/chat/create", {
        workspaceId,
      });
      const newChat = response.data;
      router.push(`workspace/chat?id=${newChat._id}`);
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-grow justify-between gap-4">
      {/* Left Section - Document and Upload */}
      <div className="bg-bg p-3 rounded-lg w-full">
        <div className="flex items-center gap-3">
          <div className="min-w-[48px] min-h-[48px] rounded-lg bg-primary flex items-center justify-center">
            <FontAwesomeIcon icon={faFolders} className="fa_icons text-white" />
          </div>
          <div>
            <p>Documents</p>
            <h3 className="mt-1">{documents.length}</h3>
          </div>
        </div>

        <div className="bg-bg100 p-3 rounded-lg mt-3 flex-grow border border-title overflow-y-auto h-[270px]">
          <ul className="w-full max-w-1/2 overflow-x-auto flex flex-col gap-2">
            {documents.map((doc, index) => (
              <div key={index} className="relative group">
                <div className="card cursor-pointer p-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 m-1">
                      <div className="min-w-[30px] min-h-[30px] rounded-lg flex items-center justify-center bg-primary">
                        <FontAwesomeIcon
                          icon={faFile}
                          className="icons text-white"
                        />
                      </div>
                      <p className="font-medium text-title">{doc.name}</p>
                      <span className="text-gray-500">{doc.status}</span>
                      {doc.status === "processed" && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadDocument(doc._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faDownToLine} className="icons" />
                        </div>
                      )}
                      <div
                        className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDocument(doc._id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="icons text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <form
            className="relative w-full p-3 border-2 border-dashed border-gray-300 rounded-lg bg-white text-center"
            onDragOver={handleDrag}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center h-48 cursor-pointer ${
                dragActive ? "bg-gray-100" : ""
              }`}
            >
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-semibold">
                Choose a file or drag & drop it here
              </p>
              <p className="text-gray-400 mt-2">
                JPEG, PNG, PDF, and MP4 formats, up to 50MB
              </p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 border rounded-lg"
                onClick={handleBrowseClick}
              >
                Browse File
              </button>
            </label>

            {selectedFiles && (
              <div className="mt-3">
                <ul>
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} className="text-gray-600">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          {dragActive && (
            <div
              className="absolute inset-0 h-full w-full"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}

          {/* Display upload button only if files are selected */}
          {selectedFiles && (
            <button
              className="py-2 px-4 bg-bg100 rounded-md flex gap-2 items-center border border-secondary text-secondary mt-3"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="icons" />{" "}
                  {/* Icone de chargement */}
                  <span>
                    Uploading document, please do not leave the page...
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} /> Upload
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Right Section - Chats and Documents */}
      <div className="w-full flex flex-col gap-3">
        {/* Chat Section */}
        <div className="bg-bg p-3 rounded-lg h-full w-full flex flex-col">
          <div className="flex items-center gap-3">
            <div className="min-w-[48px] min-h-[48px] rounded-lg bg-primary flex items-center justify-center">
              <FontAwesomeIcon
                icon={faComments}
                className="fa_icons text-white"
              />
            </div>
            <div>
              <p>Chats</p>
              <h3 className="mt-1">{chats.length}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 h-full md:grid-cols-2 gap-3 rounded-[24px] mt-3">
            <button
              onClick={createNewChat}
              disabled={loading}
              className={`p-[24px] rounded-[24px] bg-bg100 flex items-center justify-center border-2 border-[#e5e7eb] transition-all duration-[0.5s] ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary"
              }`}
            >
              {loading ? (
                <span>Creating...</span>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="icons  mr-1"
                  />
                  <p className="">New Chat</p>
                </>
              )}
            </button>

            <div className="h-[250px] flex flex-col gap-3 overflow-y-auto">
              <h3>Chats List</h3>
              <div className="flex flex-col gap-2">
                {chats
                  .slice(0, viewMore ? chats.length : 4)
                  .map((chat, index) => (
                    <div key={index} className="relative group">
                      <Link
                        href={`workspace/chat?id=${chat._id}`}
                        className="card cursor-pointer p-0"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="min-w-[30px] min-h-[30px] rounded-lg flex items-center justify-center bg-primary">
                              <FontAwesomeIcon
                                icon={faComment}
                                className="icons text-white"
                              />
                            </div>
                            <p className="font-medium text-title">
                              {chat.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat._id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="icons text-red-600"
                        />
                      </div>
                    </div>
                  ))}
                <div
                  className="card p-0 flex items-center gap-2 cursor-pointer"
                  onClick={() => setViewMore(!viewMore)}
                >
                  <div className="w-[30px] h-[30px] rounded-md flex items-center justify-center bg-primary">
                  {viewMore ? <FontAwesomeIcon icon={faMinus} className="icons text-h1 text-white" /> : <FontAwesomeIcon icon={faPlus} className="icons text-h1 text-white" />}
                  </div>
                  <p className="font-medium text-title">
                    {viewMore ? "View less..." : "View more..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Section */}
        <div className="bg-bg p-3 rounded-lg h-full w-full flex flex-col">
          <div className="flex items-center gap-3">
            <div className="min-w-[48px] min-h-[48px] rounded-lg bg-primary flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSparkles}
                className="fa_icons text-white"
              />
            </div>
            <p>Generate documents</p>
          </div>

          <div className="grid grid-cols-1 h-full md:grid-cols-2 gap-3 rounded-[24px] mt-3">
            <Link
              href="workspace/fill-template"
              className="p-[24px] rounded-[24px] bg-bg100 flex items-center justify-center border-2 border-[#e5e7eb] transition-all duration-[0.5s] ease-in-out hover:bg-secondary"
            >
              <FontAwesomeIcon
                icon={faFilePen}
                className="icons  mr-1"
              />
              <p className="">Fill a template</p>
            </Link>
            <Link
              href="workspace/generate-document"
              className="p-[24px] rounded-[24px] bg-bg100 flex items-center justify-center border-2 border-[#e5e7eb] transition-all duration-[0.5s] ease-in-out hover:bg-secondary"
            >
              <FontAwesomeIcon
                icon={faFilePen}
                className="icons  mr-1"
              />
              <p className=" text-center">
                Generate a full document
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading workspace details...</div>}>
      <WorkspacePage />
    </Suspense>
  );
}