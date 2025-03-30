"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faChevronDown, faChevronRight } from "@fortawesome/pro-light-svg-icons";

type FolderProps = {
  name: string;
  children?: React.ReactNode;
};

const Folder: React.FC<FolderProps> = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ml-2 border-l border-border pl-1">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-sm font-semibold flex items-center text-desc"
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronDown} className="mr-2 text-desc" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="mr-2 text-desc" />
        )}
        <FontAwesomeIcon icon={faFolder} className="mr-2 text-desc" />
        {name}
      </div>
      {isOpen && <div className="ml-2 text-desc">{children}</div>}
    </div>
  );
};

const File: React.FC<{ name: string }> = ({ name }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      onClick={() => setIsVisible(!isVisible)}
      className="ml-2 text-xs flex items-center border-l pl-4 cursor-pointer"
    >
      {isVisible ? (
        <>
          <FontAwesomeIcon icon={faFile} className="mr-2 text-desc" /> {name}
        </>
      ) : (
        <span className="ml-2 text-desc">File hidden (click to show)</span>
      )}
    </div>
  );
};

const TreeFile: React.FC = () => {
  return (
    <div className="-ml-2 h-full">
      <Folder name="Documents">
        <Folder name="Contracts">
          <Folder name="Legal">
            <File name="NDA.pdf" />
          </Folder>
          <Folder name="Agreements" />
        </Folder>
        <Folder name="Reports" />
      </Folder>
      <Folder name="Projects">
        <Folder name="Project A">
          <File name="ProjectPlan.docx" />
          <File name="DesignMockup.psd" />
          <Folder name="Development">
            <Folder name="CodeFiles">
              <File name="index.html" />
              <File name="styles.css" />
            </Folder>
          </Folder>
        </Folder>
      </Folder>
    </div>
  );
};

export default TreeFile;
