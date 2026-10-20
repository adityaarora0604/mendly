// src/lib/contexts/session-context.tsx
"use client";
import React, { createContext, useContext } from "react";

const SessionContext = createContext({ user: { name: "Anushka" } });

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionContext.Provider value={{ user: { name: "Anushka" } }}>{children}</SessionContext.Provider>;
};

export function useSession() {
  return useContext(SessionContext);
}
