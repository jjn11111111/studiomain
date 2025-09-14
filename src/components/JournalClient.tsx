
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PlusCircle, Loader2, Globe, Lock, ArrowRight } from 'lucide-react';
import JournalForm from './JournalForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { addJournalEntry, getJournalEntries, getPublicJournalEntries, JournalEntry } from '@/lib/firestore';
import { exerciseData } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Link from 'next/link';

function JournalTable({ entries, isLoading, noEntriesText }: { entries: JournalEntry[], isLoading: boolean, noEntriesText: string }) {
  const getAuthorDisplayName = (entry: JournalEntry) => {
    if (entry.authorEmail) {
      return entry.authorEmail.split('@')[0];
    }
    return 'Anonymous';
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Module & Exercise</TableHead>
                <TableHead>Observations</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right w-[180px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {noEntriesText}
                  </TableCell>
                </TableRow>
              ) : (
                entries.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell>
                       <Link href={`/journal/${entry.videoId}`} className="font-medium flex items-center gap-2 hover:underline">
                        {entry.isPublic ? <Globe className="h-4 w-4 text-blue-500" title="Public"/> : <Lock className="h-4 w-4 text-muted-foreground" title="Private"/>}
                        {entry.videoTitle}
                       </Link>
                      <div className="text-sm text-muted-foreground ml-6">{entry.module}</div>
                    </TableCell>
                    <TableCell>
                      <p>{entry.notes}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-muted-foreground">{getAuthorDisplayName(entry)}</p>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(entry.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}


export default function JournalClient() {
  const { user } = useAuth();
  const [myEntries, setMyEntries] = useState<JournalEntry[]>([]);
  const [publicEntries, setPublicEntries] = useState<JournalEntry[]>([]);
  const [isLoadingMine, setIsLoadingMine] = useState(true);
  const [isLoadingPublic, setIsLoadingPublic] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchEntries = async () => {
        setIsLoadingMine(true);
        const userEntries = await getJournalEntries(user.uid);
        setMyEntries(userEntries);
        setIsLoadingMine(false);
      };
      fetchEntries();
    } else {
      setIsLoadingMine(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchPublicEntries = async () => {
      setIsLoadingPublic(true);
      const entries = await getPublicJournalEntries();
      setPublicEntries(entries);
      setIsLoadingPublic(false);
    };
    fetchPublicEntries();
  }, []);

  const handleSaveEntry = async (formData: { videoId: string; notes: string; isPublic: boolean; }) => {
    if (!user) return;
    
    const allVideos = exerciseData.flatMap(unit => unit.videos);
    const video = allVideos.find(v => v.id === formData.videoId);

    if (!video) return;

    const newEntryData = { 
      ...formData,
      userId: user.uid,
      videoTitle: video.title,
      date: new Date().toISOString(),
      authorEmail: user.email ?? undefined,
    };

    try {
      const newEntry = await addJournalEntry(newEntryData);
      setMyEntries(prev => [newEntry, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      if (newEntry.isPublic) {
        setPublicEntries(prev => [newEntry, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
      setIsFormOpen(false); // Close the dialog on save
    } catch (error) {
        console.error("Failed to save journal entry:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">Workout Journal</h1>
        {user && (
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
        )}
      </div>

       <Tabs defaultValue="my-entries" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="my-entries">My Entries</TabsTrigger>
          <TabsTrigger value="public-feed">Public Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="my-entries">
           <JournalTable 
              entries={myEntries} 
              isLoading={isLoadingMine} 
              noEntriesText={!user ? "Please log in to view and create journal entries." : 'You have no journal entries yet. Click "New Entry" to add one!'}
            />
        </TabsContent>
        <TabsContent value="public-feed">
          <JournalTable 
            entries={publicEntries} 
            isLoading={isLoadingPublic}
            noEntriesText="No public journal entries yet. Be the first to share your experience!"
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-muted-foreground prose prose-lg max-w-none">
        <p>Every individual is a unique manifestation of spirit made flesh and as such, distinctive reactions will characterize each user experience. While some people may have immediate results which are tangible on multiple sensory levels, other participants may only notice slight to no perceptable changes.</p>
        <hr className="my-8" />
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
        <hr className="my-8" />
        <p className="mt-4">A Consistent Regimen of engagement will only support increased development of associated desirable outcomes. This creator defines desired spirtiual outcomes as: truthful discovery of self which includes all strata of shadow self as well as the light body. Please be aware that these exercises may shake loose repressed memories or trigger emotional vibrations which have been buried or compartmentallized in the subconscious. As best you can, release the fear and surrender to these developments.</p>
        <hr className="my-8" />
        <p>The Trintitarian form of identification, full process, and release is a NON - NEGOTIABLE feature practice for each of us. WE MUST CONFRONT OUR UNIQUE CHALLENGES HEADON! No matter the deseriptor: demons, negative energy, djinn, attachements, karma, reeping, evil intent, charm, spell, deserved, undeserved, fair, not fair,  self - sacrifice or blatant sacrifice  by other external entities of some sort.</p>
        <hr className="my-8" />
        <p>When an individual entrains self guided invocation of compassion and forgiveness for self, 100% acceptance of   present moment situation, accepts 100%  of choices, transgressions, and the effect of external transgressions against others IS THE MOMENT WHEN BALANCE WILL BEGIN TO FORM VIBRATIONALLY. Individual EM fields enjoy increasing 4 wave coherence and engender laser like qualities associated with increased output, focus, and clarity. The physical body experiences tangible release of pressure present all over the body but particularly in the chest area, solar plexus, and the domain of our spiritual heart. It is the moment of catharsis when we begin to feel lighter; a peace that passes all understanding begins to grow inside us which pervades all layers and forms a foundation of personal faith, divine purpose, and ascension.</p>
        <hr className="my-8" />
        <p>When that most powerful act of forgiveness finds legs, the individual powerfully decouples from attachemnts, blockages,  percieved bad choices, guilt, shame, self pity, personal evil intent, and even the most heinous acts of transgression from external forces of evil.  This describes complete physical as well as spiritual alignment. - more to follow</p>
      </div>
    </div>
  );
}
