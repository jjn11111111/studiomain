'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { exerciseData } from '@/lib/data';

const journalSchema = z.object({
  videoId: z.string().min(1, { message: 'Please select an exercise.' }),
  notes: z.string().min(10, { message: 'Please enter a description of at least 10 characters.' }),
  intensity: z.number().min(1).max(10),
  tags: z.array(z.string()).optional(),
});

type JournalFormValues = z.infer<typeof journalSchema>;

const allVideos = exerciseData.flatMap(unit =>
  unit.videos.map(video => ({
    value: video.id,
    label: `${unit.title.split(':')[0]}: ${video.title}`,
  }))
);

const predefinedTags = [
  'Astral Projection', 'Brain Fog', 'Calm', 'Clarity', 'Emotional Release',
  'Energized', 'Floating', 'Focused', 'Geometric Patterns', 'Lucid Dreaming',
  'Mood Shift', 'Past Life Recall', 'Remote Viewing', 'Spiritual Connection',
  'Tingling', 'Vivid Colors'
];


interface JournalFormProps {
  onSave: (data: JournalFormValues) => void;
  onCancel: () => void;
}

export default function JournalForm({ onSave, onCancel }: JournalFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      videoId: '',
      notes: '',
      intensity: 5,
      tags: [],
    },
  });

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    form.setValue('tags', newTags);
  };

  const onSubmit = (data: JournalFormValues) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the exercise you completed" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allVideos.map(video => (
                    <SelectItem key={video.value} value={video.value}>
                      {video.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your physical, emotional, and visual sensations..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intensity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensity Rating: {form.watch('intensity')}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormDescription>Select tags that describe your experience.</FormDescription>
            <div className="flex flex-wrap gap-2 pt-2">
                {predefinedTags.map(tag => (
                    <Button
                        key={tag}
                        type="button"
                        variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                        onClick={() => toggleTag(tag)}
                        size="sm"
                    >
                        {tag}
                    </Button>
                ))}
            </div>
        </FormItem>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Entry</Button>
        </div>
      </form>
    </Form>
  );
}
