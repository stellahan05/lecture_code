export interface MusicRecord {
    id: string;
    track: string;
    artist: string;
    streams: number;
    genre: string;
}

export interface MusicSource {
    getRecords(): MusicRecord[];
}