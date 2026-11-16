'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Female' | 'Male' | 'Prefer not to say';
  birthday: string;
  mobileNumber: string;
}

const EMPTY_PROFILE: UserProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'Female',
  birthday: '',
  mobileNumber: '',
};

interface ProfileContextType {
  profile: UserProfileData;
  updateProfile: (data: Partial<UserProfileData>) => Promise<void>;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfileData>(EMPTY_PROFILE);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize from live AuthContext user or stored preferences
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bridesberry_user_profile');
      const parsed = stored ? JSON.parse(stored) : {};

      setProfile({
        firstName: user?.firstName || parsed.firstName || '',
        lastName: user?.lastName || parsed.lastName || '',
        email: user?.email || parsed.email || '',
        gender: parsed.gender || 'Female',
        birthday: parsed.birthday || '',
        mobileNumber: parsed.mobileNumber || '',
      });
    } catch {
      setProfile({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        gender: 'Female',
        birthday: '',
        mobileNumber: '',
      });
    }
  }, [user]);

  const updateProfile = async (data: Partial<UserProfileData>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('bridesberry_user_profile', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // If user is authenticated and name changed, persist to backend database
    if (user && (data.firstName !== undefined || data.lastName !== undefined)) {
      try {
        await updateUserProfile(
          data.firstName !== undefined ? data.firstName : user.firstName || '',
          data.lastName !== undefined ? data.lastName : user.lastName || ''
        );
      } catch (err) {
        console.error('Failed to sync profile with database:', err);
      }
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
