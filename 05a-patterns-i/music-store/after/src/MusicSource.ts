/** One play, in the one shape MyWrapped understands. */
export interface MusicRecord {
	id: string;
	track: string;
	artist: string;
	streams: number;
	genre: string;
}

/** Any platform's plays, as MusicRecords. */
export interface MusicSource {
	getRecords(): MusicRecord[];
}
