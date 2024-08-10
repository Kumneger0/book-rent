"use client";

import { User } from "@prisma/client";
import { createContext, use } from "react";

export const UserContext = createContext<{ user: User | null }>({ user: null });

export default function UserContextWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = use(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextWrapper");
  }
  return context;
}
