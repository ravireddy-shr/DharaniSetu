import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, OfficerProfile, Role } from '../types';
import {
  DEMO_CITIZEN, DEMO_ADMIN, DEMO_OFFICERS, DEMO_REGISTERED_CITIZENS
} from '../data/demoData';

interface AuthState {
  user: User | OfficerProfile | null;
  isAuthenticated: boolean;
  loginRole: Role | null;
  otpSent: boolean;
  otpEmail: string;
  pendingUserData: Partial<User & OfficerProfile> | null;

  // Actions
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: Role }>;
  sendOTP: (email: string, role: Role, extraData?: Record<string, string>) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | OfficerProfile) => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loginRole: null,
      otpSent: false,
      otpEmail: '',
      pendingUserData: null,

      loginWithPassword: async (email: string, password: string) => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPass = password.trim();

        if (!cleanEmail) {
          return { success: false, error: 'Please enter your User ID or Email' };
        }
        if (!cleanPass) {
          return { success: false, error: 'Please enter your Password' };
        }

        // 1. Check Admin
        if (cleanEmail === DEMO_ADMIN.email.toLowerCase() || cleanEmail === 'admin' || cleanEmail === 'admin@dharanisetu.gov.in') {
          if (cleanPass === 'admin123' || cleanPass === '123456' || cleanPass === 'admin') {
            set({ user: DEMO_ADMIN, isAuthenticated: true, loginRole: 'admin' });
            return { success: true, role: 'admin' };
          }
          return { success: false, error: 'Invalid Administrator password. Default password: admin123' };
        }

        // 2. Check Officers (Tahsildar, Revenue, Survey, Planning, Sub-Registrar)
        if (cleanEmail === 'tahsildar' || cleanEmail === 'tahsildar@dharanisetu.gov.in') {
          const tahsildar = DEMO_OFFICERS.find(o => o.department === 'Tahsildar') || DEMO_OFFICERS[1];
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer') {
            set({ user: tahsildar, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        if (cleanEmail === 'officer' || cleanEmail === 'vro' || cleanEmail === 'vro@dharanisetu.gov.in' || cleanEmail === 'officer@dharanisetu.gov.in') {
          const vro = DEMO_OFFICERS.find(o => o.designation?.includes('VRO')) || DEMO_OFFICERS[0];
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer') {
            set({ user: vro, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        if (cleanEmail === 'surveyor' || cleanEmail === 'surveyor@dharanisetu.gov.in') {
          const surveyor = DEMO_OFFICERS.find(o => o.department === 'Survey') || DEMO_OFFICERS[2];
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer') {
            set({ user: surveyor, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        if (cleanEmail === 'subregistrar' || cleanEmail === 'subregistrar@dharanisetu.gov.in') {
          const subreg = DEMO_OFFICERS.find(o => o.department === 'Registration') || DEMO_OFFICERS[4];
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer') {
            set({ user: subreg, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        if (cleanEmail === 'planner' || cleanEmail === 'planner@dharanisetu.gov.in' || cleanEmail === 'planning.gnt@dharanisetu.gov.in') {
          const planner = DEMO_OFFICERS.find(o => o.department === 'Town Planning') || DEMO_OFFICERS[3];
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer') {
            set({ user: planner, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        const matchedOfficer = DEMO_OFFICERS.find(
          o => o.email.toLowerCase() === cleanEmail || o.officerId.toLowerCase() === cleanEmail
        );
        if (matchedOfficer) {
          if (cleanPass === 'officer123' || cleanPass === '123456' || cleanPass === 'officer' || cleanPass === 'admin123') {
            set({ user: matchedOfficer, isAuthenticated: true, loginRole: 'officer' });
            return { success: true, role: 'officer' };
          }
          return { success: false, error: 'Invalid Officer password. Default password: officer123' };
        }

        // 3. Check 144 Citizens & Registered Landholders
        const matchedCitizen = DEMO_REGISTERED_CITIZENS.find(
          c => c.email.toLowerCase() === cleanEmail ||
               c.id.toLowerCase() === cleanEmail ||
               c.name.toLowerCase() === cleanEmail ||
               (c.phone && c.phone === cleanEmail)
        );
        if (matchedCitizen) {
          if (cleanPass === 'farmer123' || cleanPass === 'citizen123' || cleanPass === '123456' || cleanPass === 'citizen' || cleanPass === 'farmer' || cleanPass === 'password') {
            set({ user: matchedCitizen, isAuthenticated: true, loginRole: 'citizen' });
            return { success: true, role: 'citizen' };
          }
          return { success: false, error: 'Invalid Citizen password. Default password: citizen123 / farmer123' };
        }

        // 4. Fallback for custom citizen email entry
        if (cleanEmail.includes('@') && (cleanPass === 'farmer123' || cleanPass === 'citizen123' || cleanPass === '123456' || cleanPass === 'citizen' || cleanPass === 'farmer')) {
          const customUser: User = {
            ...DEMO_CITIZEN,
            id: `CIT-${Date.now()}`,
            email: cleanEmail,
            name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
            state: 'AP',
            district: 'AP-CHI',
            mandal: 'AP-CHI-PUTTUR',
          };
          set({ user: customUser, isAuthenticated: true, loginRole: 'citizen' });
          return { success: true, role: 'citizen' };
        }

        return {
          success: false,
          error: 'User ID / Email not recognized. Please check your credentials or pick from the 144 Citizens Directory below.'
        };
      },

      sendOTP: async (email, role, extraData) => {
        // Demo: accept known emails, or any email for citizen
        set({
          otpSent: true,
          otpEmail: email,
          loginRole: role,
          pendingUserData: { email, role, ...extraData },
        });
        // In production: call Supabase auth.signInWithOtp({ email })
        console.log(`[DEMO] OTP sent to ${email} — use 123456`);
      },

      verifyOTP: async (otp: string) => {
        const { loginRole, otpEmail, pendingUserData } = get();
        // Demo OTP is always 123456
        if (otp !== '123456') return false;

        let user: User | OfficerProfile | null = null;

        if (loginRole === 'citizen') {
          // Check if email matches any of the 144 registered farmer citizens or demo citizens
          const matchedCitizen = DEMO_REGISTERED_CITIZENS.find(
            c => c.email.toLowerCase() === otpEmail.toLowerCase()
          );

          if (matchedCitizen) {
            user = matchedCitizen;
          } else {
            user = {
              ...DEMO_CITIZEN,
              id: `CIT-${Date.now()}`,
              email: otpEmail,
              name: pendingUserData?.name || 'Demo Citizen',
              state: pendingUserData?.state || 'AP',
              district: pendingUserData?.district || 'AP-CHI',
              mandal: pendingUserData?.mandal || 'AP-CHI-PUTTUR',
            };
          }
        } else if (loginRole === 'officer') {
          const found = DEMO_OFFICERS.find(o => o.email === otpEmail);
          user = found || null;
          if (!user) return false;
        } else if (loginRole === 'admin') {
          if (otpEmail === DEMO_ADMIN.email) {
            user = DEMO_ADMIN;
          } else {
            return false;
          }
        }

        if (!user) return false;

        set({
          user,
          isAuthenticated: true,
          otpSent: false,
          pendingUserData: null,
        });
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loginRole: null,
          otpSent: false,
          otpEmail: '',
          pendingUserData: null,
        });
      },

      setUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'dharanisetu-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
