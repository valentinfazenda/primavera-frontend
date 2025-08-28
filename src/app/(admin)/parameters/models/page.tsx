"use client";

import { Switch } from "antd";
import React, { useState } from "react"; // Import useState
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faSave, faTimes } from "@fortawesome/pro-light-svg-icons"; // Import specific icons
import Input from "@/components/profile/inputs/input.component";

export default function Page() {
  const [modelName, setModelName] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true); // State for the switch

  const handleModelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(e.target.value);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your save logic here
    console.log({ modelName, apiKey, isActive }); // Log the values for debugging
    // Reset form fields
    setModelName("");
    setApiKey("");
    setIsActive(true); // Reset the switch state if needed
    close(); // Ensure you have the close function defined or passed as props
  };

  const onChange = (checked: boolean) => {
    console.log(`Switch is now ${checked ? "active" : "inactive"}`);
    setIsActive(checked); // Update the state based on switch value
  };

  return (
    <div className="border border-[#FFFFFF80] p-3 bg-bg100 rounded-lg">
      <div className="flex items-center gap-4">
        <h1>Models - New</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Input for Model Name */}
        <div className="flex items-center gap-3">
          <Input
            label="Model Name"
            placeholder="Enter model name"
            type="text"
            value={modelName}
            onChange={handleModelNameChange}
            required
          />
          <Input
            label="API Key"
            placeholder="Enter API key"
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            required
          />
        </div>
        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-2">
            <p>Is Active?</p>
            <Switch checked={isActive} onChange={onChange} />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button" // Prevent form submission
              className="flex items-center bg-[#FC5555] text-white px-4 py-2 rounded-md"
              onClick={() => close()} // Make sure close function is defined
            >
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> {/* Cancel icon */}
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center bg-[#29CC6A] text-white px-4 py-2 rounded-md"
            >
              <FontAwesomeIcon icon={faSave} className="mr-1" /> {/* Save icon */}
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}