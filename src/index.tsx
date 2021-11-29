import React from 'react';
import isEqual from 'react-fast-compare';

import createEventHandlers from './create-event-handlers';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';
import removeJWPlayerInstance from './helpers/remove-jw-player-instance';
import setJWPlayerDefaults from './helpers/set-jw-player-defaults';

import { ExtendedWindow, ReactJWPlayerProps, ReactJWPlayerState } from './types';

const UNIQUE_SCRIPT_ID = 'jw-player-script';
const DISPLAY_NAME = 'ReactJWPlayer';

const noOp = (): void => {
  // do nothing.
};

const DEFAULT_PROPS: Omit<ReactJWPlayerProps, 'playerId' | 'playerScript'> = {
  aspectRatio: 'inherit',
  file: '',
  isAutoPlay: undefined,
  isMuted: undefined,
  onAdPlay: noOp,
  onAdResume: noOp,
  onAdSkipped: noOp,
  onAdComplete: noOp,
  onEnterFullScreen: noOp,
  onExitFullScreen: noOp,
  onMute: noOp,
  onUnmute: noOp,
  onAutoStart: noOp,
  onResume: noOp,
  onPlay: noOp,
  onClose: noOp,
  onReady: noOp,
  onError: noOp,
  onAdPause: noOp,
  onPause: noOp,
  onVideoLoad: noOp,
  onOneHundredPercent: noOp,
  onThreeSeconds: noOp,
  onTenSeconds: noOp,
  onThirtySeconds: noOp,
  onTwentyFivePercent: noOp,
  onFiftyPercent: noOp,
  onSeventyFivePercent: noOp,
  onNinetyFivePercent: noOp,
  onTime: noOp,
  onBuffer: noOp,
  onBufferChange: noOp,
  playlist: '',
  customProps: {},
  useMultiplePlayerScripts: false
};



class ReactJWPlayer extends React.Component<ReactJWPlayerProps, ReactJWPlayerState> {
  static displayName = DISPLAY_NAME;

  static defaultProps = DEFAULT_PROPS;

  public eventHandlers;

  private uniqueScriptId;

  private videoRef: Element | null;

  constructor(props: ReactJWPlayerProps) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: false
    };
    this.uniqueScriptId = UNIQUE_SCRIPT_ID;
    if (props.useMultiplePlayerScripts) {
      this.uniqueScriptId += `-${ props.playerId }`;
    }

    this.videoRef = null;
    this.eventHandlers = createEventHandlers(this);
    this._initialize = this._initialize.bind(this);
    this._setVideoRef = this._setVideoRef.bind(this);
  }

  componentDidMount(): void {
    const isJWPlayerScriptLoaded = Boolean((window as ExtendedWindow).jwplayer);
    const existingScript = document.getElementById(this.uniqueScriptId);
    const isUsingMultiplePlayerScripts = this.props.useMultiplePlayerScripts;

    if (!isUsingMultiplePlayerScripts && (isJWPlayerScriptLoaded || existingScript)) {
      this._initialize();
      return;
    }

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: this._initialize,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: this.uniqueScriptId
      });
    } else {
      
      existingScript.addEventListener('onload', this._initialize);
    }
  }

  shouldComponentUpdate(nextProps: ReactJWPlayerProps): boolean {
    const hasFileChanged = this.props.file !== nextProps.file;
    const hasPlaylistChanged = !isEqual(this.props.playlist, nextProps.playlist);

    return hasFileChanged || hasPlaylistChanged;
  }

  componentDidUpdate(): void{
    if (typeof window !== 'undefined' && this.videoRef !== null) {
      const extendedWindow = window as ExtendedWindow;
      if (extendedWindow.jwplayer(this.videoRef)) {
        this._initialize();
      }
    }
  }

  componentWillUnmount(): void {
    const existingScript = document.getElementById(this.uniqueScriptId);
    existingScript?.removeEventListener('onload', this._initialize);
    removeJWPlayerInstance(this.videoRef, window);
  }

  _initialize(): void {
    const { playerId, useMultiplePlayerScripts } = this.props;

    if (useMultiplePlayerScripts) {
      setJWPlayerDefaults({ context: window, playerId });
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const component = this;
    let player;

    if (typeof window !== 'undefined' && this.videoRef !== null) {
      const extendedWindow = window as ExtendedWindow;
      player = extendedWindow.jwplayer(this.videoRef);
    }
    if (!player) {
      // this player ref may have been destroyed already
      return;
    }

    const playerOpts = getPlayerOpts(this.props);

    initialize({ component, player, playerOpts });
  }

  _setVideoRef = (element: HTMLDivElement): void => {
    this.videoRef = element;
  };

  render(): JSX.Element {
    return (
      <div className={ this.props.className } >
        <div id={ this.props.playerId } ref={ this._setVideoRef } />
      </div>
    );
  }
}



export default ReactJWPlayer;
