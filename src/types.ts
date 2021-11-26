export interface ReactJWPlayerProps {
  aspectRatio: 'inherit' | '1:1' | '16:9';
  className?: string;
  file?: string;
  generatePrerollUrl?: () => void;
  image?: string;
  isAutoPlay?: boolean;
  isMuted?: boolean;
  licenseKey?: string;
  onAdPause?: () => void;
  onAdPlay?: () => void;
  onAdResume?: () => void;
  onAdSkipped?: () => void;
  onAdComplete?: () => void;
  onAutoStart?: () => void;
  onEnterFullScreen?: () => void;
  onError?: () => void;
  onExitFullScreen?: () => void;
  onFiftyPercent?: () => void;
  onMute?: () => void;
  onNinetyFivePercent?: () => void;
  onOneHundredPercent?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onClose: () => void;
  onReady?: () => void;
  onResume?: () => void;
  onSeventyFivePercent?: () => void;
  onTenSeconds?: () => void;
  onThirtySeconds?: () => void;
  onThreeSeconds?: () => void;
  onTwentyFivePercent?: () => void;
  onTime?: () => void;
  onUnmute?: () => void;
  onVideoLoad?: () => void;
  onBuffer?: () => void;
  onBufferChange?: () => void;
  playerId: string;
  playerScript: string;
  playlist: string | MediaObject[];
  useMultiplePlayerScripts: boolean;
}
  
export interface ReactJWPlayerState {
  adHasPlayed: boolean;
  hasPlayed: boolean;
  hasFired: boolean;
}
  
export type ExtendedWindow = Window  & typeof globalThis & {
  jwplayer: jwplayer.JWPlayerStatic;
};

/**
 * Media object used in playlists\
 * Reference: https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#playlists
 * @interface
 */
export interface MediaObject {
  /** URL or path to media resouce  */
  file: string;

  //TODO: add type
  /** Schedule advertising for a specific media file */
  adschedule?: unknown;

  /** Short description of the item. It is displayed below the title. 
   * This can be hidden with the displaydescription option. 
   */
  description?: string;

  /** Poster image URL. Displayed before and after playback. */
  image?: string;

  /** Unique identifier of this item. Used by advertising, analytics and discovery services */
  mediaid?: string;

  /** HLS-only In seconds, the minimum amount of content in an M3U8 required to trigger DVR mode. 
   * Set to 0 to always display DVR mode. (Defaults to 120) 
   */
  minDvrWindow?: number;

  /** URL to a feed that contains related items for a particular playlist item */
  recommendations?: string; 

  //TODO: add type
  /** Used for quality toggling and alternate sources */
  sources: [];

  /** Time in seconds to start a media item.
   * NOTE: When used with an MP4 video file, both seek and seeked events are triggered. 
   * Neither event is triggered when used with a DASH or HLS stream. 
   */
  starttime: number;

  /** Title of the item. 
   * This is displayed inside of the player prior to playback, as well as in the visual playlist. 
   * This can be hidden with the displaytitle option 
   */
  title: string;

  //TODO: Add type
  /** Include captions, chapters, and thumbnails for media */
  tracks: [];

  /** If true, "withCredentials" will be used to request a media file rather than CORS */
  withCredentials: boolean;
}



