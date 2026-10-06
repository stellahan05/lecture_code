import { MyWrapped } from "./MyWrapped";
import { SpotifyAdapter, AppleMusicAdapter } from "./adapters";
import { SpotifyClient } from "./vendor/spotify";
import { AppleMusicLibrary } from "./vendor/appleMusic";

const wrapped = new MyWrapped([
	new SpotifyAdapter(new SpotifyClient()),
	new AppleMusicAdapter(new AppleMusicLibrary()),
]);
wrapped.reportTopArtists();
wrapped.reportTopGenres();
