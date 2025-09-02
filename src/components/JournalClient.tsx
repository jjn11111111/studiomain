'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PlusCircle, Loader2 } from 'lucide-react';
import JournalForm from './JournalForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { addJournalEntry, getJournalEntries, JournalEntry } from '@/lib/firestore';
import { exerciseData } from '@/lib/data';

export default function JournalClient() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchEntries = async () => {
        setIsLoading(true);
        const userEntries = await getJournalEntries(user.uid);
        setEntries(userEntries);
        setIsLoading(false);
      };
      fetchEntries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleSaveEntry = async (formData: { videoId: string; notes: string; intensity: number; tags: string[] }) => {
    if (!user) return;
    
    const allVideos = exerciseData.flatMap(unit => unit.videos);
    const video = allVideos.find(v => v.id === formData.videoId);

    if (!video) return;

    const newEntryData = { 
      ...formData,
      userId: user.uid,
      videoTitle: video.title,
      date: new Date().toISOString(),
    };

    try {
      const newEntry = await addJournalEntry(newEntryData);
      setEntries(prev => [newEntry, ...prev]);
      setIsFormOpen(false); // Close the dialog on save
    } catch (error) {
        console.error("Failed to save journal entry:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">Workout Journal</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>New Journal Entry</DialogTitle>
            </DialogHeader>
            <JournalForm onSave={handleSaveEntry} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {isLoading ? (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">You have no journal entries yet. Click "New Entry" to add one!</p>
        ) : (
          entries.map(entry => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.videoTitle}</CardTitle>
                <CardDescription>
                  {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - Intensity: {entry.intensity}/10
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{entry.notes}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
