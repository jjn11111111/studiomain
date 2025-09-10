
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
      
      <div className="mt-8 text-muted-foreground prose prose-lg max-w-none">
        <p>Every individual is a unique manifestation of spirit made flesh and as such, distinctive reactions will characterize each user experience. While some people may have immediate results which are tangible on multiple sensory levels, other participants may only notice slight to no perceptable changes.</p>
        <p>Whatever the case, users are encouraged to develop their own consistent approach. As I have developed these exercises and in my own personal meditative practice, I have experienced the following effects:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>A sense of well-being and tangible release of tension throughout body</li>
          <li>Pressure sensations in the sinuses and head cavity that increase and feel somewhat like a grip which increases in pressure from the inside/out</li>
          <li>Greatly increased sensitivity to energetic flows/motion of EMF's which form the basis of the holographiuc universe. This energetic flow in physical reality is akin to the "digital snow" produced in an old school cathode ray tube TV.</li>
          <li>The apprearence of vortices/vortex fields during and hours after using the exercies - all the time now</li>
          <li>An increased sense of "knowing"</li>
          <li>increased empathy, automatically "knowing" other's thoughts</li>
          <li>Automatic connection with environment</li>
          <li>Increased vivid, lucid dreaming</li>
          <li>Tangible manifest spiritually initiated phenomena - ringing in ears, pressure waves, visual chasers, EMF visuals, strong sense of magnetism, tremors, ionic wind at varous locations on body espeicially hands and feet</li>
          <li>Increase measurable manifestation from thought form to physical manifestation in the 3D</li>
        </ul>
        <p className="mt-4">A Consistent Regimen of engagement will only support increased development of associated desirable outcomes. This creator defines desired spirtiual outcomes as: truthful discovery of self which includes all strata of shadow self as well as the light body. Please be aware that these exercises may shake loose repressed memories or trigger emotional vibrations which have been buried or compartmentallized in the subconscious. As best you can, release the fear and surrender to these developments.</p>
        <p>The Trintitarian form of identification, full process, and release is a NON - NEGOTIABLE feature practice for each of us. WE MUST CONFRONT OUR UNIQUE CHALLENGES HEADON! No matter the deseriptor: demons, negative energy, djinn, attachements, karma, reeping, evil intent, charm, spell, deserved, undeserved, fair, not fair,  self - sacrifice or blatant sacrifice  by other external entities of some sort.</p>
        <p>When an individual entrains self guided invocation of compassion and forgiveness for self, 100% acceptance of   present moment situation, accepts 100%  of choices, transgressions, and the effect of external transgressions against others IS THE MOMENT WHEN BALANCE WILL BEGIN TO FORM VIBRATIONALLY. Individual EM fields enjoy increasing 4 wave coherence and engender laser like qualities associated with increased output, focus, and clarity. The physical body experiences tangible release of pressure present all over the body but particularly in the chest area, solar plexus, and the domain of our spiritual heart. It is the moment of catharsis when we begin to feel lighter; a peace that passes all understanding begins to grow inside us which pervades all layers and forms a foundation of personal faith, divine purpose, and ascension.</p>
        <p>When that most powerful act of forgiveness finds legs, the individual powerfully decouples from attachemnts, blockages,  percieved bad choices, guilt, shame, self pity, personal evil intent, and even the most heinous acts of transgression from external forces of evil.  This describes complete physical as well as spiritual alignment. - more to follow</p>
      </div>
    </div>
  );
}
