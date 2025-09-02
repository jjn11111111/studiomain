'use client';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  getDoc,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';

export interface JournalEntry {
  id: string;
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string;
  intensity: number;
  tags: string[];
  date: string;
}

export interface JournalEntryData {
  userId: string;
  videoId: string;
  videoTitle: string;
  notes: string;
  intensity: number;
  tags: string[];
  date: string;
}

// Add a new journal entry to Firestore
export async function addJournalEntry(entryData: JournalEntryData): Promise<JournalEntry> {
  const docRef = await addDoc(collection(db, 'journalEntries'), {
    ...entryData,
    createdAt: Timestamp.now(),
  });
  return {
      id: docRef.id,
      ...entryData
  };
}

// Get all journal entries for a specific user
export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  const entries: JournalEntry[] = [];
  const q = query(
    collection(db, 'journalEntries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      intensity: data.intensity,
      tags: data.tags || [],
      date: data.date,
    });
  });

  return entries;
}
