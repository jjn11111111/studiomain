
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { JournalEntry, getPublicJournalEntriesForVideo } from '@/lib/firestore';
import { exerciseData } from '@/lib/data';
import Link from 'next/link';

export default function ExerciseJournalPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.videoId as string;

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const allVideos = exerciseData.flatMap(unit => unit.videos.map(v => ({...v, moduleTitle: unit.title})));
  const videoInfo = allVideos.find(v => v.id === videoId);

  useEffect(() => {
    if (videoId) {
      const fetchEntries = async () => {
        setIsLoading(true);
        const videoEntries = await getPublicJournalEntriesForVideo(videoId);
        setEntries(videoEntries);
        setIsLoading(false);
      };
      fetchEntries();
    }
  }, [videoId]);

  const getAuthorDisplayName = (entry: JournalEntry) => {
    if (entry.authorEmail) {
      return entry.authorEmail.split('@')[0];
    }
    return 'Anonymous';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/journal">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">{videoInfo?.title ?? 'Exercise Journal'}</CardTitle>
              <CardDescription>Public journal entries from the community for this exercise.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Author</TableHead>
                      <TableHead>Observations</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : entries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No public entries for this exercise yet. Be the first to share!
                        </TableCell>
                      </TableRow>
                    ) : (
                      entries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{getAuthorDisplayName(entry)}</TableCell>
                          <TableCell>{entry.notes}</TableCell>
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
        </div>
      </main>
    </div>
  );
}
