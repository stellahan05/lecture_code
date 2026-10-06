import { MyWrapped } from "./MyWrapped";
import { SpotifyClient } from "./vendor/spotify";
import { AppleMusicLibrary } from "./vendor/appleMusic";

const wrapped = new MyWrapped(new SpotifyClient(), new AppleMusicLibrary());
wrapped.reportTopArtists();
wrapped.reportTopGenres();
