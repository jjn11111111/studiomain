// IMPORTANT: For proprietary videos, the videoUrl properties below should not be public URLs.
// A secure solution using Firebase Storage and Authentication is recommended to protect your content.
// The current URLs are placeholders for development.

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl:string;
}

export interface Unit {
  id: string;
  title: string;
  groupName: string;
  description: string;
  videos: Video[];
}

export const exerciseData: Unit[] = [
  {
    id: 'module-1',
    title: 'Module 1',
    groupName: 'Red Group',
    description: 'Begin your journey by gently awakening your senses and preparing your mind for deeper exploration. These exercises focus on basic relaxation and visualization.',
    videos: [
      { id: 'vid-1-1', title: 'Avocado', description: 'A guided breathing exercise to calm the nervous system and center your awareness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(12).MP4?alt=media' },
      { id: 'vid-1-2', title: 'Banana', description: 'Visualize a gentle light glowing in the center of your forehead.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(23).MP4?alt=media' },
      { id: 'vid-1-3', title: 'Cantaloupe', description: 'Observe simple, rotating geometric shapes to train your focus.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(26)%202.MP4?alt=media' },
      { id: 'vid-1-4', title: 'Dragon Fruit', description: 'Focus on the sensation of energy flowing through your body.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(29).MP4?alt=media' },
      { id: 'vid-1-5', title: 'Eggplant', description: 'Practice mindful listening to the sounds around you.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%202.mp4?alt=media' },
      { id: 'vid-1-6', title: 'Fig', description: 'Gentle stretching and body awareness exercise.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(20)%202.MP4?alt=media' },
      { id: 'vid-1-7', title: 'Guava', description: 'Grounding exercise: connect with the energy of the Earth.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/E0EC785D-9098-43D4-A5E1-A1A797828BA7.MOV?alt=media' },
      { id: 'vid-1-8', title: 'Honeydew', description: 'Explore color visualization for emotional balance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2010.MP4?alt=media' },
      { id: 'vid-1-9', title: 'Icaco', description: 'A meditation on releasing tension and stress.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/059BA0B9-E6E3-41BE-80FC-8188C39C1DC2%203.MOV?alt=media' },
      { id: 'vid-1-10', title: 'Juniper Berry', description: 'Introduction to feeling your bio-energetic field (aura).', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video.mp4?alt=media' },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2',
    groupName: 'Yellow Group',
    description: 'Engage in exercises designed to directly stimulate the pineal gland through specific frequencies and more complex visual patterns.',
    videos: [
        { id: 'vid-2-1', title: 'Aardvark', description: 'A deep humming meditation that creates vibrations resonating with the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/4DBC6A36-6762-421F-AFD0-A4ACDA4A8DBA.mov?alt=media' },
        { id: 'vid-2-2', title: 'Boa Constrictor', description: 'Focus on a pulsating indigo light to energize and activate.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/539DBB90-6C01-45D9-9E87-DDF483F52E6B.MOV?alt=media' },
        { id: 'vid-2-3', title: 'Cockatoo', description: 'Deepen your meditative state by focusing on intricate, evolving mandala patterns.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/7370E570-2BCE-4197-A24D-F5009870D4BB.MOV?alt=media' },
        { id: 'vid-2-4', title: 'Dinosaur', description: 'Working with binaural beats tuned to pineal gland frequencies.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/7B79617E-B7F3-4BA8-A666-2107F6AEE307.mov?alt=media' },
        { id: 'vid-2-5', title: 'Elephant', description: 'Visualizing the decalcification and opening of the pineal gland.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/995A4F30-693B-4BBE-851A-0784FDE1DC91%202.MOV?alt=media' },
        { id: 'vid-2-6', title: 'Flamingo', description: 'Coordinating breath with light pulses for deeper stimulation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/9EDFDCFE-A980-4A72-9A9A-4AC32F4DE860.mov?alt=media' },
        { id: 'vid-2-7', title: 'Giraffe', description: 'Chanting specific seed sounds (bija mantras) for the third eye.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/A895F267-429A-49AD-8FA3-A1A36676DCC5.mov?alt=media' },
        { id: 'vid-2-8', title: 'Hummingbird', description: 'Directing energy to the third eye using geometric flows.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/BEBCAC8F-717C-427F-9CD3-C903E91F3B03%202.MOV?alt=media' },
        { id: 'vid-2-9', title: 'Iguana', description: 'Advanced visualization: building an inner sanctuary.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2017.MP4?alt=media&token=05e8ad7c-3a15-42c7-9c79-95dc5c452cef' },
        { id: 'vid-2-10', title: 'Jaguar', description: 'Introduction to scrying with a dark mirror or crystal.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2018.MP4?alt=media' },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3',
    groupName: 'Blue Group',
    description: 'Journey beyond the self with advanced techniques that aim to open pathways to higher states of awareness and intuitive insight.',
    videos: [
        { id: 'vid-3-1', title: 'Aspen', description: 'An immersive journey through stars and galaxies to expand your sense of self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%206.MP4?alt=media' },
        { id: 'vid-3-2', title: 'Beech', description: 'Use abstract visual cues to help you listen to your inner voice.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2015.MP4?alt=media' },
        { id: 'vid-3-3', title: 'Catalpa', description: 'A free-form visual meditation to unlock your inner vision.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video.mp4?alt=media' },
        { id: 'vid-3-4', title: 'Dogwood', description: 'Meditation on the concept of universal consciousness.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%208.MP4?alt=media' },
        { id: 'vid-3-5', title: 'Eucalyptus', description: 'Remote viewing basics: sensing a location from a distance.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%207.MP4?alt=media' },
        { id: 'vid-3-6', title: 'Fir', description: 'Exploring the Akashic records through guided meditation.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%205.MP4?alt=media' },
        { id: 'vid-3-7', title: 'Ginkgo', description: 'Connecting with spirit guides or your higher self.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2014.MP4?alt=media' },
        { id: 'vid-3-8', title: 'Hazelnut', description: 'Perceiving past lives and their influence.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2013.MP4?alt=media' },
        { id: 'vid-3-9', title: 'Ilex', description: 'Astral projection preparation and techniques.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2012.MP4?alt=media' },
        { id: 'vid-3-10', title: 'Jacaranda', description: 'Merging your consciousness with an object or plant.', thumbnailUrl: 'https://placehold.co/800x450', videoUrl: 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Video%2011.MP4?alt=media' },
    ],
  },
];
