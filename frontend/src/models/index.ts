export interface Artist {
    id: number | string;
    name: string;
    genres: string[];
    popularity: number;
    totalTracks: number;
    averageTrackPopularity: number;
    collaborationCount: {
      solo: number;
      collaboration: number;
    };
    topTracks: { trackName: string; popularity: number }[];
    trendData: { date: string; popularity: number }[];
    albums: Album[];
  }
  
  
  export interface AudioFeaturesData {
    id: string;
    acousticness: number;
    danceability: number;
    duration: number;
    energy: number;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    valence: number;
    genre: string;
  }
  
  export interface ArtistNode {
    id: number;
    name: string;
    genre: string;
  }
  
  export interface CollaborationLink {
    source: number;
    target: number;
  }

  export interface Album {
    id: string;
    albumName: string;
    releaseDate: string;
    popularity: number;
    tracklist: Track[];
  }

  export interface Track {
    id: string;
    name: string;
    duration: number;
    popularity: number;
    artist: Artist;
    audioFeatures: AudioFeaturesData;
    discNumber: number;
    explicit: boolean;
  }
  