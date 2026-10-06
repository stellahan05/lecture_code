// Stand-in for Spotify's SDK. Treat it as third-party code: don't modify it.
// The types show what it returns; you don't need to read past them.

import * as fs from "fs";
import * as path from "path";

export interface SpotifyStream {
	stream_id: string;
	track: string;
	artist_name: string;
	play_count: number;
	metadata: { genre: string };
}

export class SpotifyClient {
	getStreamHistory(): SpotifyStream[] {
		return JSON.parse(fs.readFileSync(path.join(__dirname, "../data/spotify_plays.json"), "utf-8"));
	}
}
