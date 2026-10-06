// Stand-in for YouTube Music's SDK. Treat it as third-party code: don't modify it.
// The types show what it returns; you don't need to read past them.

import * as fs from "fs";
import * as path from "path";
import { parseXML } from "../utils/xmlParser";

export interface YouTubeVideo {
	videoId: string;
	title: string;
	channel: string;
	views: string;
	category: string;
}

export class YouTubeMusicApi {
	listWatchedVideos(): YouTubeVideo[] {
		return parseXML(
			fs.readFileSync(path.join(__dirname, "../data/youtube_plays.xml"), "utf-8"),
			"video"
		) as unknown as YouTubeVideo[];
	}
}
