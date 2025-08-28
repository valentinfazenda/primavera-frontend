"use client";

import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import Input from "@/components/profile/inputs/input.component";
import PasswordInput from "@/components/profile/inputs/password-input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLockOpen } from "@fortawesome/pro-light-svg-icons";
import Image from "next/image";
import user from "@/assets/svg/logo.svg";

export function ProfileForm() {
  const { data: profile, isLoading } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordSection, setChangePasswordSection] = useState(false);

  // Display state (what is shown in the header)
  const [displayFirstName, setDisplayFirstName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");

  // Fill both form + display states when profile loads
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setDisplayFirstName(profile.firstName || "");
      setDisplayLastName(profile.lastName || "");
    }
  }, [profile]);

  const handleSubmit = () => {
    if (changePasswordSection && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutate(
      {
        firstName,
        lastName,
        email,
        ...(newPassword ? { password: newPassword } : {}),
      },
      {
        onSuccess: (updated) => {
          // Only update the displayed name after successful save
          setDisplayFirstName(updated.firstName);
          setDisplayLastName(updated.lastName);
          setChangePasswordSection(false);
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-[#FFFFFF1A] border border-[#FFFFFF80] rounded-lg p-3">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faUser} className="icons text-title" />
          <h3 className="text-title">Information</h3>
        </div>
        <div className="bg-bg border border-[#FFFFFF80] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <Image className="rounded-full" width={70} src={user} alt="user" />
                <div>
                <h2>
                    {displayFirstName} {displayLastName}
                </h2>
                <p>
                    {profile?.status === "admin" ? "Administrator" : "User"}
                </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="bg-primary flex items-center gap-[8px] text-white text-normal py-2 px-4 rounded-md"
                disabled={isPending}
              >
                <FontAwesomeIcon icon={faUser} className="icons" />
                {isPending ? "Saving..." : "Edit"}
              </button>
              <button
              onClick={() => setChangePasswordSection((prev) => !prev)}
              className="border border-primary flex items-center gap-[8px] text-title text-normal py-2 px-4 rounded-md"
              >
              <FontAwesomeIcon icon={faLockOpen} className="icons" />
              {changePasswordSection ? "Cancel Password Change" : "Change Password"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Input
              label="First name"
              placeholder="Enter first name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last name"
              placeholder="Enter last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              label="Email"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      {changePasswordSection && (
        <div className="bg-[#FFFFFF1A] border border-[#FFFFFF80] rounded-lg p-3 mt-3">
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faLockOpen} className="icons text-title" />
            <h3 className="text-title">Change Password</h3>
          </div>
          <div className="border rounded-xl bg-bg p-4">
            <div className="flex items-center gap-3">
              <PasswordInput
                label="New Password"
                placeholder="**********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="**********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-primary flex items-center gap-[8px] text-white text-normal py-2 px-4 rounded-md mt-3"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
