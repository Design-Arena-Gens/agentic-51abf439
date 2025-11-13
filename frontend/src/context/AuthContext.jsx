import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

const STORAGE_KEYS = {
  token: 'annapurnai_token',
  user: 'annapurnai_user',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.user);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.token));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await authApi.getProfile();
        setUser(data.user);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user));
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const persist = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem(STORAGE_KEYS.token, authToken);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(authUser));
  };

  const signup = async (payload) => {
    const { data } = await authApi.signup(payload);
    persist(data.token, data.user);
    return data.user;
  };

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    persist(data.token, data.user);
    return data.user;
  };

  const updateProfile = async (payload) => {
    const { data } = await authApi.updateProfile(payload);
    setUser(data.user);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      signup,
      login,
      logout,
      updateProfile,
      isAuthenticated: Boolean(token),
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

