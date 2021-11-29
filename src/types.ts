export interface ReactJWPlayerProps {
  /** A unique Id for the player instance. Used to distinguish the container divs. */
  playerId: string;

  /** Link to a valid JW Player script. */
  playerScript: string;

  /** Link to a valid JW Player playlist or playlist array. */
  playlist: string | MediaObject[];

  /** An optional aspect ratio to give the video player. Can be 'inherit', 1:1 or 16:9 currently. */
  aspectRatio: 'inherit' | '1:1' | '16:9';

  /** An optional class name to give the container div. */
  className?: string;

  /** Link to a valid JW Player video file. */
  file?: string;

  /** URL to a poster image to display before playback starts. */
  image?: string;

  /** Determines whether the player starts automatically or not. */
  isAutoPlay?: boolean;
  
  /** Determines whether the player starts muted or not. */
  isMuted?: boolean;
  
  /** License Key as supplied in the jwplayer dashboard, under: Players > Tools > Downloads > JW Player */
  licenseKey?: string;
  
  /** EXPERIMENTAL - Allows loading of multiple player scripts with the proper configuration. */
  useMultiplePlayerScripts?: boolean;

  /** Custom JWPlayer properties */
  customProps: unknown;

  /** Supply a function that returns a VAST or GOOGIMA tag for use in generating a preroll advertisement. */
  generatePrerollUrl?: () => void;

  /** A function that is run when the user pauses the preroll advertisement. */
  onAdPause?: () => void;

  /** A function that is run once, when the preroll advertisement first starts to play. */
  onAdPlay?: () => void;

  /** A function that is run when the user resumes playing the preroll advertisement. */
  onAdResume?: () => void;

  /** A function that is run when the user skips an advertisement. */
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


export type PlayerEvent = 
'adPlay'
| 'adResume'
| 'adSkipped'
| 'adComplete'
| 'enterFullScreen'
| 'exitFullScreen'
| 'mute'
| 'unmute'
| 'autoStart'
| 'resume'
| 'play'
| 'close'
| 'ready'
| 'error'
| 'adPause'
| 'pause'
| 'videoLoad'
| 'oneHundredPercent'
| 'threeSeconds'
| 'tenSeconds'
| 'thirtySeconds'
| 'twentyFivePercent'
| 'fiftyPercent'
| 'seventyFivePercent'
| 'ninetyFivePercent'
| 'time'
| 'buffer'
| 'bufferChange'
| 'beforeComplete'
| 'beforePlay'
| 'fullscreen'
| 'playlistItem';



export const eventMap: { [key in keyof Partial<ReactJWPlayerProps>]: keyof jwplayer.EventParams } = {
  onAdPlay: 'adPlay',
  onAdSkipped: 'adSkipped',
  onAdComplete: 'adComplete',
  onPlay: 'play',
  onReady: 'ready',
  onError: 'error',
  onAdPause: 'adPause',
  onPause: 'pause',
  onTime: 'time',
  onBuffer: 'buffer',
  onBufferChange: 'bufferChange'
};
