
'use client';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db as getDb } from './firebase';
import { exerciseData } from './data';

export interface JournalEntry {
  id: string;
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string; // This field holds the "comments"
  date: string; // ISO string format
  module: string;
  isPublic: boolean;
  authorEmail?: string;
}

export interface JournalEntryData {
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string;
  date: string;
  isPublic: boolean;
  authorEmail?: string;
}

// Add a new journal entry to Firestore
export async function addJournalEntry(entryData: JournalEntryData): Promise<JournalEntry> {
  const db = getDb();
  // The 'createdAt' field automatically includes date and time.
  const docRef = await addDoc(collection(db, 'journalEntries'), {
    ...entryData,
    createdAt: Timestamp.now(), 
  });

  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));
  const video = allVideos.find(v => v.id === entryData.videoId);

  return {
      id: docRef.id,
      ...entryData,
      module: video?.module ?? 'Unknown Module'
  };
}

// Get all journal entries for a specific user
export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, 'journalEntries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const video = allVideos.find(v => v.id === data.videoId);
    
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: data.isPublic || false,
      authorEmail: data.authorEmail,
      module: video?.module ?? 'Unknown Module'
    });
  });

  return entries;
}

// Get all public journal entries
export async function getPublicJournalEntries(): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, "journalEntries"),
    where("isPublic", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const video = allVideos.find(v => v.id === data.videoId);
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: data.authorEmail,
      module: video?.module ?? "Unknown Module",
    });
  });

  return entries;
}


// Get all public journal entries for a specific video
export async function getPublicJournalEntriesForVideo(videoId: string): Promise<JournalEntry[]> {
  const db = getDb();
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, "journalEntries"),
    where("isPublic", "==", true),
    where("videoId", "==", videoId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, module: unit.title})));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const video = allVideos.find(v => v.id === data.videoId);
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: data.authorEmail,
      module: video?.module ?? "Unknown Module",
    });
  });

  return entries;
}
