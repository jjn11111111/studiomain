'use client';
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';

const PROGRESS_KEY = 'thirdEyeCrossTrainingProgress';

interface ProgressContextType {
    completedVideos: Set<string>;
    toggleComplete: (videoId: string) => void;
    isComplete: (videoId: string) => boolean;
    markAsComplete: (videoId: string) => void;
    isInitialized: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);


export function ProgressProvider({children}: {children: ReactNode}) {
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        setCompletedVideos(new Set(JSON.parse(storedProgress)));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(completedVideos)));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [completedVideos, isInitialized]);

  const toggleComplete = useCallback((videoId: string) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  }, []);
  
  const markAsComplete = useCallback((videoId: string) => {
    setCompletedVideos(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(videoId)) {
        newSet.add(videoId);
      }
      return newSet;
    });
  }, []);

  const isComplete = useCallback((videoId: string) => {
    return completedVideos.has(videoId);
  }, [completedVideos]);

  const value = { completedVideos, toggleComplete, isComplete, markAsComplete, isInitialized };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
