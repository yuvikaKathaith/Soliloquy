"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { LayoutDashboard, Settings } from "lucide-react";
import React from "react";

const UserMenu = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard size={16} />}
          href="/dashboard"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
