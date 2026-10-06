// Stand-in for Apple Music's SDK. Treat it as third-party code: don't modify it.
// The types show what it returns; you don't need to read past them.

import * as fs from "fs";
import * as path from "path";
import { parseCSV } from "../utils/csvParser";

export interface AppleMusicRow {
	ID: string;
	Song: string;
	By: string;
	Streams: string;
	Style: string;
}

export class AppleMusicLibrary {
	exportLibrary(): AppleMusicRow[] {
		return parseCSV(
			fs.readFileSync(path.join(__dirname, "../data/apple_plays.csv"), "utf-8")
		) as unknown as AppleMusicRow[];
	}
}
