
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
      { id: 'vid-1-1', level: 1, title: 'Module 1(a)vocado', description: 'A guided breathing exercise to calm the nervous system and center your awareness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(12).MP4?alt=media' },
      { id: 'vid-1-2', level: 2, title: 'Module 1(b)anana', description: 'Visualize a gentle light glowing in the center of your forehead.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(23).MP4?alt=media' },
      { id: 'vid-1-3', level: 3, title: 'Module 1(c)antaloupe', description: 'Observe simple, rotating geometric shapes to train your focus.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(26)%202.MP4?alt=media' },
      { id: 'vid-1-4', level: 4, title: 'Module 1(d)ragon Fruit', description: 'Focus on the sensation of energy flowing through your body.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(29).MP4?alt=media' },
      { id: 'vid-1-5', level: 5, title: 'Module 1(e)ggplant', description: 'Practice mindful listening to the sounds around you.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%202.mp4?alt=media' },
      { id: 'vid-1-6', level: 6, title: 'Module 1(f)ig', description: 'Gentle stretching and body awareness exercise.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(20)%202.MP4?alt=media' },
      { id: 'vid-1-7', level: 7, title: 'Module 1(g)uava', description: 'Grounding exercise: connect with the energy of the Earth.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/E0EC785D-9098-43D4-A5E1-A1A797828BA7.MOV?alt=media' },
      { id: 'vid-1-8', level: 8, title: 'Module 1(h)oneydew', description: 'Explore color visualization for emotional balance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
      { id: 'vid-1-9', level: 9, title: 'Module 1(i)caco', description: 'A meditation on releasing tension and stress.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { id: 'vid-1-10', level: 10, title: 'Module 1(j)uniper Berry', description: 'Introduction to feeling your bio-energetic field (aura).', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video.MP4?alt=media' },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: Yellow Group',
    description: 'Engage in exercises designed to directly stimulate the pineal gland through specific frequencies and more complex visual patterns.',
    videos: [
        { id: 'vid-2-1', level: 11, title: 'Module 2(a)ardvark', description: 'A deep humming meditation that creates vibrations resonating with the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/4DBC6A36-6762-421F-AFD0-A4ACDA4A8DBA.mov?alt=media' },
        { id: 'vid-2-2', level: 12, title: 'Module 2(b)oa constrictor', description: 'Focus on a pulsating indigo light to energize and activate.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/539DBB90-6C01-45D9-9E87-DDF483F52E6B.MOV?alt=media' },
        { id: 'vid-2-3', level: 13, title: 'Module 2(c)ockatoo', description: 'Deepen your meditative state by focusing on intricate, evolving mandala patterns.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/7370E570-2BCE-4197-A24D-F5009870D4BB.MOV?alt=media' },
        { id: 'vid-2-4', level: 14, title: 'Module 2(d)inosaur', description: 'Working with binaural beats tuned to pineal gland frequencies.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/7B79617E-B7F3-4BA8-A666-2107F6AEE307.mov?alt=media' },
        { id: 'vid-2-5', level: 15, title: 'Module 2(e)lephant', description: 'Visualizing the decalcification and opening of the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/995A4F30-693B-4BBE-851A-0784FDE1DC91%202.MOV?alt=media' },
        { id: 'vid-2-6', level: 16, title: 'Module 2(f)lamingo', description: 'Coordinating breath with light pulses for deeper stimulation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/9EDFDCFE-A980-4A72-9A9A-4AC32F4DE860.mov?alt=media' },
        { id: 'vid-2-7', level: 17, title: 'Module 2(g)iraffe', description: 'Chanting specific seed sounds (bija mantras) for the third eye.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/A895F267-429A-49AD-8FA3-A1A36676DCC5.mov?alt=media' },
        { id: 'vid-2-8', level: 18, title: 'Module 2(h)ummingbird', description: 'Directing energy to the third eye using geometric flows.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-2-9', level: 19, title: 'Module 2(i)guana', description: 'Advanced visualization: building an inner sanctuary.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-2-10', level: 20, title: 'Module 2(j)aguar', description: 'Introduction to scrying with a dark mirror or crystal.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: Blue Group',
    description: 'Journey beyond the self with advanced techniques that aim to open pathways to higher states of awareness and intuitive insight.',
    videos: [
        { id: 'vid-3-1', level: 21, title: 'Module 3(a)spen', description: 'An immersive journey through stars and galaxies to expand your sense of self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { id: 'vid-3-2', level: 22, title: 'Module 3(b)eech', description: 'Use abstract visual cues to help you listen to your inner voice.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: 'vid-3-3', level: 23, title: 'Module 3(c)atalpa', description: 'A free-form visual meditation to unlock your inner vision.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 'vid-3-4', level: 24, title: 'Module 3(d)ogwood', description: 'Meditation on the concept of universal consciousness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { id: 'vid-3-5', level: 25, title: 'Module 3(e)ucalyptus', description: 'Remote viewing basics: sensing a location from a distance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        { id: 'vid-3-6', level: 26, title: 'Module 3(f)ir', description: 'Exploring the Akashic records through guided meditation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: 'vid-3-7', level: 27, title: 'Module 3(g)inkgo', description: 'Connecting with spirit guides or your higher self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { id: 'vid-3-8', level: 28, title: 'Module 3(h)azelnut', description: 'Perceiving past lives and their influence.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { id: 'vid-3-9', level: 29, title: 'Module 3(i)lex', description: 'Astral projection preparation and techniques.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { id: 'vid-3-10', level: 30, title: 'Module 3(j)acaranda', description: 'Merging your consciousness with an object or plant.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
];
