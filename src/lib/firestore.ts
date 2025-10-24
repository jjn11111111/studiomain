
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
  createdAt: string;
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

export interface CommunityPost {
    id: string;
    userId: string;
    content: string;
    createdAt: string; // ISO string format
    authorEmail?: string;
}

export interface CommunityPostData {
    userId: string;
    content: string;
    createdAt: string;
    authorEmail?: string;
}

// Add a new community post to Firestore
export async function addCommunityPost(postData: CommunityPostData): Promise<CommunityPost> {
  const db = getDb();
  const docRef = await addDoc(collection(db, 'communityPosts'), {
    ...postData,
    createdAt: Timestamp.now(), 
  });

  const newDoc = await getDoc(docRef);
  const data = newDoc.data();
  const createdAtTimestamp = data?.createdAt as Timestamp;

  return {
      id: docRef.id,
      ...postData,
      createdAt: createdAtTimestamp.toDate().toISOString(),
  };
}


// Get all community posts
export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const db = getDb();
  const posts: CommunityPost[] = [];
  const q = query(
    collection(db, "communityPosts"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    posts.push({
      id: doc.id,
      userId: data.userId,
      content: data.content,
      createdAt: createdAtTimestamp.toDate().toISOString(),
      authorEmail: data.authorEmail,
    });
  });

  return posts;
}


// Add a new journal entry to Firestore
export async function addJournalEntry(entryData: JournalEntryData): Promise<JournalEntry> {
  const db = getDb();
  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({ ...v, module: unit.title })));
  const videoInfo = allVideos.find(v => v.id === entryData.videoId);

  const docRef = await addDoc(collection(db, 'journalEntries'), {
    ...entryData,
    videoTitle: videoInfo?.title ?? 'Unknown Video',
    module: videoInfo?.module ?? 'Unknown Module',
    createdAt: Timestamp.now(),
  });

  const newDoc = await getDoc(docRef);
  const data = newDoc.data();
  const createdAtTimestamp = data?.createdAt as Timestamp;

  return {
    id: docRef.id,
    ...entryData,
    videoTitle: videoInfo?.title ?? 'Unknown Video',
    module: videoInfo?.module ?? 'Unknown Module',
    createdAt: createdAtTimestamp.toDate().toISOString(),
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

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: data.isPublic || false,
      authorEmail: data.authorEmail,
      module: data.module ?? 'Unknown Module',
      createdAt: createdAtTimestamp.toDate().toISOString(),
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

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: data.authorEmail,
      module: data.module ?? "Unknown Module",
      createdAt: createdAtTimestamp.toDate().toISOString(),
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

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    entries.push({
      id: doc.id,
      userId: data.userId,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      notes: data.notes,
      date: data.date,
      isPublic: true,
      authorEmail: data.authorEmail,
      module: data.module ?? "Unknown Module",
      createdAt: createdAtTimestamp.toDate().toISOString(),
    });
  });

  return entries;
}
