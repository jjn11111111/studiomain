'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PlusCircle } from 'lucide-react';
import JournalForm from './JournalForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

// Mock data for now
const mockEntries = [
  { id: '1', date: '2024-07-30', videoTitle: 'Module 1(a)vocado', intensity: 7, notes: 'Felt a deep sense of calm and saw swirling blue colors.', tags: ['Calm', 'Vivid Colors'] },
  { id: '2', date: '2024-07-29', videoTitle: 'Module 1(b)anana', intensity: 8, notes: 'Very energizing session. Felt a buzzing sensation in my forehead.', tags: ['Energized', 'Tingling'] },
];

export default function JournalClient() {
  const [entries, setEntries] = useState(mockEntries);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // This function will eventually save to Firestore
  const handleSaveEntry = (entry: any) => {
    console.log('Saving entry:', entry);
    // Add to mock data for now
    const newEntry = { ...entry, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    setEntries(prev => [newEntry, ...prev]);
    setIsFormOpen(false); // Close the dialog on save
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
        {entries.length === 0 ? (
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
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
