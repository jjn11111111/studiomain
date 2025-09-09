
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
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

  const handleSaveEntry = async (formData: { videoId: string; notes: string; }) => {
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
      setEntries(prev => [newEntry, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setIsFormOpen(false); // Close the dialog on save
    } catch (error) {
        console.error("Failed to save journal entry:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">Workout Journal</h1>
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

      <Card>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Module & Exercise</TableHead>
                    <TableHead>Observations</TableHead>
                    <TableHead className="text-right w-[180px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                           <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                        </TableCell>
                      </TableRow>
                  ) : !user ? (
                     <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        Please log in to view and create journal entries.
                      </TableCell>
                    </TableRow>
                  ) : entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        You have no journal entries yet. Click "New Entry" to add one!
                      </TableCell>
                    </TableRow>
                  ) : (
                    entries.map(entry => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="font-medium">{entry.videoTitle}</div>
                          <div className="text-sm text-muted-foreground">{entry.module}</div>
                        </TableCell>
                        <TableCell>
                          <p>{entry.notes}</p>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                           {new Date(entry.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
