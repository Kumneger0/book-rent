"use client";

import { User } from "@prisma/client";
import { createContext } from "react";

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
