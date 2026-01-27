// context.tsx
import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  user: string;
  signedIn: boolean;
  loading: boolean; // ✅ เพิ่ม loading
};

type AuthContextType = {
  authState: AuthState;
  setSignedIn: (user: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshLogin: () => Promise<void>;
};

const defaultValue: AuthContextType = {
  authState: { user: '', signedIn: false, loading: true },
  setSignedIn: async () => {},
  signOut: async () => {},
  refreshLogin: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

const STORAGE_KEY = 'Logined';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: '',
    signedIn: false,
    loading: true,
  });

  const refreshLogin = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value) {
        setAuthState({ user: value, signedIn: true, loading: false });
      } else {
        setAuthState({ user: '', signedIn: false, loading: false });
      }
    } catch (e) {
      // ถ้าอ่าน storage ไม่ได้ ให้ถือว่าไม่ได้ login
      setAuthState({ user: '', signedIn: false, loading: false });
    }
  };

  useEffect(() => {
    refreshLogin(); // ✅ โหลดสถานะ login ทันทีตอนเปิดแอป
  }, []);

  const setSignedIn = async (user: string) => {
    const u = user.trim();
    await AsyncStorage.setItem(STORAGE_KEY, u); // ✅ persist
    setAuthState({ user: u, signedIn: true, loading: false });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY); // ✅ ลบ persist
    setAuthState({ user: '', signedIn: false, loading: false });
  };

  const value = useMemo(
    () => ({ authState, setSignedIn, signOut, refreshLogin }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};