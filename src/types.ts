
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
  customProps?: unknown;

  /** Supply a function that returns a VAST or GOOGIMA tag for use in generating a preroll advertisement. */
  generatePrerollUrl?: () => void;
  

  /* Fired when the player encounters any errors. */
  /**  Fired when an error occurs after setup. */
  onError?: () => void;
  
  onAutoStart?: () => void;
  onEnterFullScreen?: () => void;
  
  onExitFullScreen?: () => void;
  onFiftyPercent?: () => void;
  onMute?: jwplayer.EventCallback<jwplayer.EventParams['mute']>;
  onNinetyFivePercent?: () => void;
  onOneHundredPercent?: () => void;
  onClose?: () => void;
 
  onResume?: () => void;
  onSeventyFivePercent?: () => void;
  onTenSeconds?: () => void;
  onThirtySeconds?: () => void;
  onThreeSeconds?: () => void;
  onTwentyFivePercent?: () => void;
  onTime?: () => void;
  onUnmute?: () => void;
  onVideoLoad?: () => void;
}

/* Set of events related to advertisements. */
export interface ReactJWPlayerProps {
  
  /** Fired whenever an ad is requested by the player. */
  onAdRequest?: () => void;

  /** Fired when the user taps skip button during ad. */
  onAdSkipped?: () => void;
  
  /** Fired when ad is done playing. */
  onAdComplete?: () => void; 

  /** Fired when ad shows up on the screen. */
  onAdImpression?: () => void; 

  /** VPAID-only. Will trigger when a VPAID ad creative signals to our player that it is starting. 
   * This differs from adImpression since the advertisement may not yet be visible. 
   * Fires after the first onAdPlay event. 
   */
  onAdStarted?: () => void;

  /** Fired when new metadata has been broadcasted by the player during an Ad. */
  onAdMeta?: () => void; 

  /** Fired when ad start to play or is resumed after pause. */
  onAdPlay?: () => void;

  /** Fired when ad is paused. */
  onAdPause?: () => void; 

  /** Fired whenever an ad contains companions. */
  onAdCompanions?: () => void; 

  /** Fired when ad can’t be played for any reason (onError event is fired at the same time). */
  onAdError?: () => void; 

  /** Continuous ad playback time update. */
  onAdTime?: (event: jwplayer.EventParams['adTime']) => void;
}

/*  A set of events reporting changes in the player state. 
      Each event (except onReady) has two params 
      newState and oldState that represent current state after event and previous state.
  */
export interface ReactJWPlayerProps {
/** Triggered the instant a user attempts to play a file. */
  //TODO: event missing in @types/jwplayer
  // onPlayAttempt?: () => void;

  /** Triggered by a video's first frame event (Or the instant an audio file begins playback). */
  onFirstFrame?: (event: jwplayer.EventParams['firstFrame']) => void;

  /** The player stopped playing. */
  onIdle?: (event: jwplayer.EventParams['idle']) => void;

  //TODO: event missing in @types/jwplayer
  /** The player has done playing current media. */
  // onComplete: (event: jwplayer.EventParams['complete']) => void;

  /** The player is buffering media. */
  onBuffer?: (event: jwplayer.EventParams['buffer']) => void;

  /** Fired when the currently playing item loads additional data into its buffer. */
  onBufferChange?: (event: jwplayer.EventParams['bufferChange']) => void;

  /** The player started to play media. */
  onPlay?: (event: jwplayer.EventParams['play']) => void; 

  /** The player is paused. */
  onPause?: (event: jwplayer.EventParams['pause']) => void;

  /** The player is created and ready to be used. */
  onReady?: (event: jwplayer.EventParams['ready']) => void;
}
  
export interface ReactJWPlayerState {
  adHasPlayed: boolean;
  hasPlayed: boolean;
  hasFired: boolean;
}

export type PlayerConfigs = { [playerId: string] : unknown }; 
  
export type ExtendedWindow = Window  & typeof globalThis & {
  jwplayer: jwplayer.JWPlayerStatic;
  __JW_PLAYER_CONFIGS__: PlayerConfigs;
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
  sources?: [];

  /** Time in seconds to start a media item.
   * NOTE: When used with an MP4 video file, both seek and seeked events are triggered. 
   * Neither event is triggered when used with a DASH or HLS stream. 
   */
  starttime?: number;

  /** Title of the item. 
   * This is displayed inside of the player prior to playback, as well as in the visual playlist. 
   * This can be hidden with the displaytitle option 
   */
  title?: string;

  //TODO: Add type
  /** Include captions, chapters, and thumbnails for media */
  tracks?: [];

  /** If true, "withCredentials" will be used to request a media file rather than CORS */
  withCredentials?: boolean;
}

/** Map component callback names to jwplayer events */
export const callbackToEventMap: { [key in keyof Partial<ReactJWPlayerProps>]: keyof jwplayer.EventParams } = {
  onAdRequest: 'adRequest',
  onAdSkipped: 'adSkipped',
  onAdComplete: 'adComplete',
  onAdImpression: 'adImpression',
  onAdStarted: 'adStarted',
  // TODO: event missing in @types/jwplayer
  //onAdMeta: 'adMeta'
  onAdPlay: 'adPlay',
  onAdPause: 'adPause',
  onAdCompanions: 'adCompanions',
  onAdError: 'adError',
  onAdTime: 'adTime',
 
  onPlay: 'play',
  onPause: 'pause',
  onReady: 'ready',
  onError: 'error',

  onTime: 'time',
  onBuffer: 'buffer',
  onBufferChange: 'bufferChange',
  onMute: 'mute'
};
