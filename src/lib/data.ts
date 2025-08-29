
// IMPORTANT: For proprietary videos, the videoUrl properties below should not be public URLs.
// A secure solution using Firebase Storage and Authentication is recommended to protect your content.
// The current URLs are placeholders for development.

export interface Video {
  id: string;
  level: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

export const exerciseData: Unit[] = [
  {
    id: 'module-1',
    title: 'Module 1: Red Group',
    description: 'Begin your journey by gently awakening your senses and preparing your mind for deeper exploration. These exercises focus on basic relaxation and visualization.',
    videos: [
      { id: 'vid-1-1', level: 1, title: 'Module 1(a)vocado', description: 'A guided breathing exercise to calm the nervous system and center your awareness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { id: 'vid-1-2', level: 2, title: 'Module 1(b)anana', description: 'Visualize a gentle light glowing in the center of your forehead.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 'vid-1-3', level: 3, title: 'Module 1(c)antaloupe', description: 'Observe simple, rotating geometric shapes to train your focus.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 'vid-1-4', level: 4, title: 'Module 1(d)ragon Fruit', description: 'Focus on the sensation of energy flowing through your body.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 'vid-1-5', level: 5, title: 'Module 1(e)ggplant', description: 'Practice mindful listening to the sounds around you.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 'vid-1-6', level: 6, title: 'Module 1(f)ig', description: 'Gentle stretching and body awareness exercise.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
      { id: 'vid-1-7', level: 7, title: 'Module 1(g)uava', description: 'Grounding exercise: connect with the energy of the Earth.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { id: 'vid-1-8', level: 8, title: 'Module 1(h)oneydew', description: 'Explore color visualization for emotional balance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
      { id: 'vid-1-9', level: 9, title: 'Module 1(i)caco', description: 'A meditation on releasing tension and stress.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { id: 'vid-1-10', level: 10, title: 'Module 1(j)uniper Berry', description: 'Introduction to feeling your bio-energetic field (aura).', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: Yellow Group',
    description: 'Engage in exercises designed to directly stimulate the pineal gland through specific frequencies and more complex visual patterns.',
    videos: [
        { id: 'vid-2-1', level: 11, title: 'Module 2(a)pricot', description: 'A deep humming meditation that creates vibrations resonating with the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-2-2', level: 12, title: 'Module 2(b)lackberry', description: 'Focus on a pulsating indigo light to energize and activate.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-2-3', level: 13, title: 'Module 2(c)lementine', description: 'Deepen your meditative state by focusing on intricate, evolving mandala patterns.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-2-4', level: 14, title: 'Module 2(d)ate', description: 'Working with binaural beats tuned to pineal gland frequencies.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-2-5', level: 15, title: 'Module 2(e)lderberry', description: 'Visualizing the decalcification and opening of the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-2-6', level: 16, title: 'Module 2(f)eijoa', description: 'Coordinating breath with light pulses for deeper stimulation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: 'vid-2-7', level: 17, title: 'Module 2(g)rapefruit', description: 'Chanting specific seed sounds (bija mantras) for the third eye.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: 'vid-2-8', level: 18, title: 'Module 2(h)uckleberry', description: 'Directing energy to the third eye using geometric flows.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-2-9', level: 19, title: 'Module 2(i)mbe', description: 'Advanced visualization: building an inner sanctuary.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-2-10', level: 20, title: 'Module 2(j)ujube', description: 'Introduction to scrying with a dark mirror or crystal.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: Blue Group',
    description: 'Journey beyond the self with advanced techniques that aim to open pathways to higher states of awareness and intuitive insight.',
    videos: [
        { id: 'vid-3-1', level: 21, title: 'Module 3(a)çai', description: 'An immersive journey through stars and galaxies to expand your sense of self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-3-2', level: 22, title: 'Module 3(b)oysenberry', description: 'Use abstract visual cues to help you listen to your inner voice.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-3-3', level: 23, title: 'Module 3(c)herry', description: 'A free-form visual meditation to unlock your inner vision.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-3-4', level: 24, title: 'Module 3(d)urian', description: 'Meditation on the concept of universal consciousness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-3-5', level: 25, title: 'Module 3(e)mpress Plum', description: 'Remote viewing basics: sensing a location from a distance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-3-6', level: 26, title: 'Module 3(f)inger Lime', description: 'Exploring the Akashic records through guided meditation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: 'vid-3-7', level: 27, title: 'Module 3(g)oji Berry', description: 'Connecting with spirit guides or your higher self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: 'vid-3-8', level: 28, title: 'Module 3(h)orned Melon', description: 'Perceiving past lives and their influence.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-3-9', level: 29, title: 'Module 3(i)ndian Prune', description: 'Astral projection preparation and techniques.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-3-10', level: 30, title: 'Module 3(j)ackfruit', description: 'Merging your consciousness with an object or plant.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
];
