import MusicPlayer from "./MusicPlayer";

const tracks = [
  {
    id: "4wajJ1o7jWIg62YqpkHC7S",
    name: "Weird Fishes/Arpeggi",
    artist: "Radiohead",
    album: "In Rainbows",
    youtubeId: "V_Ydoe4Q-Gg",
  },
  {
    id: "6SmV1Oo24nCZBPzIYkL4HZ",
    name: "Alter Ego",
    artist: "Tame Impala",
    album: "Innerspeaker",
    youtubeId: "N7eGu_p2jLk",
  },
  {
    id: "6IM45SqAURH6PrvziDs1RQ",
    name: "Why Won't They Talk to Me?",
    artist: "Tame Impala",
    album: "Lonerism",
    youtubeId: "yzAjagHwL_4",
  },
  {
    id: "19Ym5Sg0YyOCa6ao21bdoG",
    name: "Gypsy",
    artist: "Fleetwood Mac",
    album: "Mirage",
    youtubeId: "cjn0i_D5lWE",
  },
  {
    id: "5UWwZ5lm5PKu6eKsHAGxOk",
    name: "Everlong",
    artist: "Foo Fighters",
    album: "The Colour and the Shape",
    youtubeId: "hq0rZ3IiyWw",
  },
];

export default function Music() {
  return <MusicPlayer tracks={tracks} />;
}
