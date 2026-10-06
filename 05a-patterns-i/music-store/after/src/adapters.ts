import { MusicRecord, MusicSource } from "./MusicSource";
import { SpotifyClient } from "./vendor/spotify";
import { AppleMusicLibrary } from "./vendor/appleMusic";

export class SpotifyAdapter implements MusicSource {
	constructor(private client: SpotifyClient) {}

	getRecords(): MusicRecord[] {
		return this.client.getStreamHistory().map((play) => ({
			id: play.stream_id,
			track: play.track,
			artist: play.artist_name,
			streams: play.play_count,
			genre: play.metadata.genre,
		}));
	}
}

export class AppleMusicAdapter implements MusicSource {
	constructor(private client: AppleMusicLibrary) {}

	getRecords(): MusicRecord[] {
		return this.client.exportLibrary().map((play) => ({
			id: play.ID,
			track: play.Song,
			artist: play.By,
			streams: parseInt(play.Streams, 10),
			genre: play.Style,
		}));
	}
}
