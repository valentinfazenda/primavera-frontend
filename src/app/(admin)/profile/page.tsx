"use client";

import user from "@/assets/svg/logo.svg";
import Input from "@/components/profile/inputs/input.component";
import PasswordInput from "@/components/profile/inputs/password-input.component";
import { faLockOpen, faUser } from "@fortawesome/pro-light-svg-icons"; // Import User and LockOpen icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import Image from "next/image";
import React, { useState } from "react";

const Profile = () => {
  const [changePasswordSection, setChangePasswordSection] = useState(false);
  const [modelName, setModelName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleModelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(e.target.value);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div className="bg-[#FFFFFF1A] border border-[#FFFFFF80] rounded-lg p-3">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faUser} className="icons text-title" />{" "}
          {/* Replace with Font Awesome icon */}
          <h3 className="text-title">Information</h3>
        </div>
        <div className="bg-bg border border-[#FFFFFF80] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <Image
                className="rounded-full"
                width={70}
                src={user}
                alt="user"
              />
              <div>
                <h2>John F.</h2>
                <p>Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-primary flex items-center gap-[8px] text-white text-normal py-2 px-4 rounded-md">
                <FontAwesomeIcon icon={faUser} className="icons" />{" "}
                {/* Replace with Font Awesome icon */}
                Edit
              </button>
              <button
                onClick={() => setChangePasswordSection(true)}
                className="border border-primary flex items-center gap-[8px] text-title text-normal py-2 px-4 rounded-md"
              >
                <FontAwesomeIcon icon={faLockOpen} className="icons" />{" "}
                {/* Replace with Font Awesome icon */}
                Change Password
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Input
              label="Name"
              placeholder="name"
              type="text"
              value={modelName}
              name="modelName"
              onChange={handleModelNameChange}
              required
            />
            <Input
              label="Surname"
              placeholder="surname"
              type="text"
              value={apiKey}
              name="apiKey"
              onChange={handleApiKeyChange}
              required
            />
            <Input
              label="Email"
              placeholder="Enter email"
              type="email"
              value={email}
              name="email"
              onChange={handleEmailChange}
              required
            />
          </div>
        </div>
      </div>

      {changePasswordSection && (
        <div className="bg-[#FFFFFF1A] border border-[#FFFFFF80] rounded-lg p-3 mt-3">
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faLockOpen} className="icons text-title" />{" "}
            {/* Replace with Font Awesome icon */}
            <h3 className="text-title">Change Password</h3>
          </div>
          <div className="border rounded-xl bg-bg p-4">
            <form>
              <div className="flex items-center gap-3">
                <PasswordInput
                  label="New Password"
                  placeholder="**********"
                  value={newPassword}
                  name="newPassword"
                  onChange={handleNewPasswordChange}
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="**********"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button
                onClick={() => {
                  setChangePasswordSection(false);
                }}
                className="bg-primary flex items-center gap-[8px] text-white text-normal py-2 px-4 rounded-md mt-3"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;