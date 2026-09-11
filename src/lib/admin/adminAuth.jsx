/**
 * TecnoMart Admin Authentication & RBAC Service
 * Supports role-based access control, rate limiting, and session security.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SESSION_KEY = 'tecnomart_admin_session';
const ATTEMPTS_KEY = 'tecnomart_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

// Role capabilities matrix
export const ROLES = {
  SUPERADMIN: 'superadmin',
  MANAGER: 'manager',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

// Seed credentials with password verification
const DEFAULT_CREDENTIALS = [
  { email: 'admin@tecnomart.in', password: 'Admin@Tecno2026!', name: 'Executive Superadmin', role: ROLES.SUPERADMIN, department: 'Executive' },
  { email: 'manager@tecnomart.in', password: 'Manager@2026!', name: 'Hyderabad Operations Manager', role: ROLES.MANAGER, department: 'Operations' },
  { email: 'editor@tecnomart.in', password: 'Editor@2026!', name: 'Catalog Specialist', role: ROLES.EDITOR, department: 'Catalog' },
  { email: 'viewer@tecnomart.in', password: 'Viewer@2026!', name: 'Support / Cashier', role: ROLES.VIEWER, department: 'Support' },
];

/**
 * Check rate limit for failed logins
 */
export function getRateLimitStatus() {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return { isLocked: false, remainingAttempts: MAX_ATTEMPTS, lockedUntil: null };

    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockedUntil && now < data.lockedUntil) {
      const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
      return { isLocked: true, remainingAttempts: 0, lockedUntil: data.lockedUntil, remainingSeconds };
    }

    if (data.lockedUntil && now >= data.lockedUntil) {
      // Lockout period expired, reset
      localStorage.removeItem(ATTEMPTS_KEY);
      return { isLocked: false, remainingAttempts: MAX_ATTEMPTS, lockedUntil: null };
    }

    return {
      isLocked: false,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - (data.count || 0)),
      lockedUntil: null
    };
  } catch (e) {
    return { isLocked: false, remainingAttempts: MAX_ATTEMPTS, lockedUntil: null };
  }
}

export function recordFailedAttempt() {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    const now = Date.now();
    let data = raw ? JSON.parse(raw) : { count: 0, firstAttempt: now };

    data.count = (data.count || 0) + 1;

    if (data.count >= MAX_ATTEMPTS) {
      data.lockedUntil = now + LOCKOUT_MS;
    }

    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
    return getRateLimitStatus();
  } catch (e) {
    return { isLocked: false, remainingAttempts: 1 };
  }
}

export function clearFailedAttempts() {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch (e) {}
}

/**
 * Login function
 */
export function authenticateStaff(email, password) {
  const rateLimit = getRateLimitStatus();
  if (rateLimit.isLocked) {
    return {
      success: false,
      error: `Security lockout: Too many failed attempts. Try again in ${rateLimit.remainingSeconds || 900} seconds.`
    };
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  const staff = DEFAULT_CREDENTIALS.find((c) => c.email.toLowerCase() === cleanEmail);

  if (!staff || staff.password !== password) {
    const updatedRate = recordFailedAttempt();
    return {
      success: false,
      error: `Invalid credentials. ${updatedRate.remainingAttempts} attempts remaining before temporary lockout.`
    };
  }

  // Clear failed attempts on success
  clearFailedAttempts();

  const session = {
    token: `tkn_tm_${Math.random().toString(36).substring(2)}_${Date.now()}`,
    user: {
      email: staff.email,
      name: staff.name,
      role: staff.role,
      department: staff.department,
    },
    loginTime: new Date().toISOString(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {}

  return { success: true, session };
}

/**
 * Check active session
 */
export function getActiveSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

/**
 * Logout
 */
export function logoutStaff() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}

/**
 * Permission check helper
 */
export function hasPermission(user, resource, action) {
  if (!user) return false;
  const role = user.role;

  if (role === ROLES.SUPERADMIN) return true;

  if (role === ROLES.MANAGER) {
    if (resource === 'users' && action === 'delete') return false;
    if (resource === 'spin_odds' && action === 'delete') return false;
    return true;
  }

  if (role === ROLES.EDITOR) {
    if (resource === 'products' && (action === 'create' || action === 'update')) return true;
    if (resource === 'blogs') return true;
    if (resource === 'copy_content') return true;
    return false;
  }

  if (role === ROLES.VIEWER) {
    return action === 'read';
  }

  return false;
}

// React Auth Context
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(getActiveSession());

  useEffect(() => {
    const handleStorage = () => setSession(getActiveSession());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (email, password) => {
    const res = authenticateStaff(email, password);
    if (res.success) {
      setSession(res.session);
    }
    return res;
  };

  const logout = () => {
    logoutStaff();
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider value={{ session, user: session?.user || null, isAuthenticated: !!session, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    // Fallback if rendered outside provider
    const session = getActiveSession();
    return {
      session,
      user: session?.user || null,
      isAuthenticated: !!session,
      login: authenticateStaff,
      logout: logoutStaff,
    };
  }
  return ctx;
}

/**
 * Route Guard Component
 */
export function AdminAuthGuard({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/myadmin/login" state={{ from: location }} replace />;
  }

  return children;
}
