import { MusicRecord, MusicSource } from "./MusicSource";

export class MyWrapped {
	constructor(private sources: MusicSource[]) {}

	private allPlays(): MusicRecord[] {
		return this.sources.flatMap((source) => source.getRecords());
	}

	reportTopArtists(): void {
		console.log("=".repeat(60));
		console.log("  \u{1F3A4} Your Top Artists");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};

		for (const play of this.allPlays()) {
			const artist = play.artist;
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

		for (const play of this.allPlays()) {
			const genre = play.genre;
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
