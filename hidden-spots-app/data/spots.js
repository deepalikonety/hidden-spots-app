// export const initialSpots = [
export const initialSpots = [
  {
    id: 1,
    name: "Bateshwar Temple Ruins",
    vibe: "Serene",
    coordinates: { latitude: 26.3849, longitude: 78.2591 },
    description: "A quiet cluster of ancient temples surrounded by nature. Peaceful and untouched by crowds.",
    images: [require('../assets/temple_1.jpg')],
    ratings: {
      uniqueness: 4.9,
      vibe: 4.8,
      safety: 4.4,
      crowd: 1.6
    },
    comments: [
      { text: "Felt like walking through history in silence.", user: "Aditya" }
    ]
  },
  {
    id: 2,
    name: "Tighra Dam Viewpoint",
    vibe: "Romantic",
    coordinates: { latitude: 26.2671, longitude: 78.1538 },
    description: "A hidden spot near Tighra Dam, away from tourist noise. Calm waters and perfect sunset views.",
    images:[require('../assets/dam.jpg')],
    ratings: {
      uniqueness: 4.6,
      vibe: 4.9,
      safety: 4.3,
      crowd: 1.7
    },
    comments: [
      { text: "The view was magical around 6:30 PM.", user: "Sneha" }
    ]
  },
  {
    id: 3,
    name: "Urvai Ghati Back Trail",
    vibe: "Creative",
    coordinates: { latitude: 26.2346, longitude: 78.1678 },
    description: "A quiet trail behind Gwalior Fort ideal for sketching, photography, or peaceful exploration.",
    images: [require('../assets/ghat.jpg')],
    ratings: {
      uniqueness: 4.7,
      vibe: 4.5,
      safety: 4.1,
      crowd: 1.5
    },
    comments: [
      { text: "Took my sketchbook and just sat for hours.", user: "Rahul" }
    ]
  },
  {
    id: 4,
    name: "Scindia Chhatris Garden",
    vibe: "Serene",
    coordinates: { latitude: 26.2059, longitude: 78.1782 },
    description: "Old royal garden with cenotaphs. Quiet, green, and perfect for reading or long walks.",
   
    images: [
  require('../assets/Chhatris.jpg'),
  require('../assets/cartoline-da-gwalior.jpg')
],
    ratings: {
      uniqueness: 4.5,
      vibe: 4.7,
      safety: 4.2,
      crowd: 2.0
    },
    comments: [
      { text: "Unexpectedly quiet for such a beautiful place.", user: "Anonymous" }
    ]
  }
];
