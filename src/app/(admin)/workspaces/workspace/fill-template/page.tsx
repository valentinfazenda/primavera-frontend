import TreeFile from "@/components/chats/chats-treefile.component";
import { faArrowLeft, faStar } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function page() {
  return (
    <div className="h-[80vh]">
      <Link
        href="\workspaces\workspace"
        className="flex items-center gap-2"
      >
        <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
          <FontAwesomeIcon icon={faArrowLeft} className="icons text-white" />
        </div>
        <h3>Fill Template</h3>
      </Link>
      <div className="flex justify-between gap-3 mt-4">
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
        <div className="bg-bg p-3 rounded-md w-full chat_box">
          <div className="flex items-center gap-2">
            <div className="w-[48px] h-[48px] bg-primary flex items-center justify-center rounded-md">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="icons text-white"
              />
            </div>
            <h3>Fill Template</h3>
          </div>
          <div className="p-[24px] rounded-[24px] bg-bg100 h-[300px] flex items-center justify-center border-2 border-[#e5e7eb] mt-3">
            <FontAwesomeIcon icon={faStar} className="icons " />
            <p className="">Generate a full document</p>
          </div>
          <div className="mt-3 flex items-end justify-end flex-col w-full">
            <div className="w-full">
              <label htmlFor="">Rules</label>
              <textarea
                className="w-full border rounded-md bg-white text-title px-3 py-2"
                placeholder="Give some guidelines to generate the template..."
                name="message"
                rows={10}
                id=""
              ></textarea>
            </div>
            <button className="flex items-center gap-2 mt-3 py-2 px-4 bg-bg100 border border-secondary text-secondary rounded-md">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
