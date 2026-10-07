import { SpotifyClient } from "./vendor/spotify";
import { AppleMusicLibrary } from "./vendor/appleMusic";
import { MusicRecord, MusicSource } from "./MusicSource";
import { YouTubeMusicApi } from "./vendor/youtubeMusic";

export class MyWrapped {
	private _sources: MusicSource[];
	constructor(
		sources: MusicSource[]
	) {
		this._sources = sources;
	}

	private allPlays(): MusicRecord[] {
		return this._sources.flatMap((source) => source.getRecords());
	}

	reportTopArtists(): void {
		console.log("=".repeat(60));
		console.log("  \u{1F3A4} Your Top Artists");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};

		// ─── All plays ──────────────────────────────────────────────────────
		for (const play of this.allPlays()) {
			const artist = play.artist; // TODO: fill in with the actual artist from the record!
			const streams = play.streams;
			counts[artist] = (counts[artist] ?? 0) + streams;
		}

		const top5 = Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		for (const [artist, total] of top5) {
			console.log(`  ${artist.padEnd(30)} ${total.toLocaleString()} streams`);
		}
		console.log();
	}

	reportTopGenres(): void {
		console.log("=".repeat(60));
		console.log("  \u{1F3B5} Your Top Genres");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};

		// ─── All plays ──────────────────────────────────────────────────────
		for (const play of this.allPlays()) {
			const genre = play.genre; // TODO: fill in with the actual genre!
			const streams = play.streams;
			counts[genre] = (counts[genre] ?? 0) + streams;
		}


		const top5 = Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		for (const [genre, total] of top5) {
			console.log(`  ${genre.padEnd(30)} ${total.toLocaleString()} streams`);
		}
		console.log();
	}
}
