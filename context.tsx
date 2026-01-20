// context.tsx
import React, { createContext, useMemo, useState } from 'react';

type AuthState = {
  user: string;
  signedIn: boolean;
};

type AuthContextType = {
  authState: AuthState;
  setSignedIn: (user: string) => void;
  signOut: () => void;
};

const defaultValue: AuthContextType = {
  authState: { user: '', signedIn: false },
  setSignedIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: '',
    signedIn: false,
  });

  const setSignedIn = (user: string) => {
    setAuthState({ user, signedIn: true });
  };

  const signOut = () => {
    setAuthState({ user: '', signedIn: false });
  };

  const value = useMemo(
    () => ({ authState, setSignedIn, signOut }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};