"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthStage = "logged-out" | "code-sent" | "verified";

interface AuthContextValue {
  hydrated: boolean;
  stage: AuthStage;
  identifier: string;
  login: (value: string) => void;
  verifyCode: (value: string) => boolean;
  logout: () => void;
}

const AUTH_STAGE_KEY = "talosly-auth-stage";
const AUTH_IDENTIFIER_KEY = "talosly-auth-identifier";
const DEMO_CODE = "2419";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<AuthStage>("logged-out");
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    const savedStage = window.localStorage.getItem(AUTH_STAGE_KEY) as AuthStage | null;
    const savedIdentifier = window.localStorage.getItem(AUTH_IDENTIFIER_KEY) ?? "";

    if (savedStage === "logged-out" || savedStage === "code-sent" || savedStage === "verified") {
      setStage(savedStage);
    }
    setIdentifier(savedIdentifier);
    setHydrated(true);
  }, []);

  const persist = (nextStage: AuthStage, nextIdentifier: string) => {
    setStage(nextStage);
    setIdentifier(nextIdentifier);
    window.localStorage.setItem(AUTH_STAGE_KEY, nextStage);
    window.localStorage.setItem(AUTH_IDENTIFIER_KEY, nextIdentifier);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      hydrated,
      stage,
      identifier,
      login: (nextIdentifier: string) => {
        persist("code-sent", nextIdentifier);
      },
      verifyCode: (value: string) => {
        const valid = value.trim() === DEMO_CODE;
        if (valid) {
          persist("verified", identifier);
        }
        return valid;
      },
      logout: () => {
        persist("logged-out", "");
      },
    }),
    [hydrated, identifier, stage],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export const demoVerificationCode = DEMO_CODE;
