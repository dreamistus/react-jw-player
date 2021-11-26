import React from 'react';
import isEqual from 'react-fast-compare';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';
import removeJWPlayerInstance from './helpers/remove-jw-player-instance';
import setJWPlayerDefaults from './helpers/set-jw-player-defaults';

import defaultProps from './default-props';
import { ExtendedWindow, ReactJWPlayerProps, ReactJWPlayerState } from './types';

const displayName = 'ReactJWPlayer';



class ReactJWPlayer extends React.Component<ReactJWPlayerProps, ReactJWPlayerState> {
  private eventHandlers;

  private uniqueScriptId;

  private videoRef: Element | null;

  static defaultProps = defaultProps;

  static displayName = displayName;

  constructor(props: ReactJWPlayerProps) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: false
    };
    this.eventHandlers = createEventHandlers(this);
    this.uniqueScriptId = 'jw-player-script';

    if (props.useMultiplePlayerScripts) {
      this.uniqueScriptId += `-${ props.playerId }`;
    }

    this.videoRef = null;
    this._initialize = this._initialize.bind(this);
    this._setVideoRef = this._setVideoRef.bind(this);
  }

  

  componentDidMount(): void {

    let isJWPlayerScriptLoaded = false;
    if (typeof window !== 'undefined') {
      const extendedWindow = window as ExtendedWindow;
      isJWPlayerScriptLoaded = Boolean(extendedWindow.jwplayer);
    }

    const existingScript = document.getElementById(this.uniqueScriptId);
    const isUsingMultiplePlayerScripts = this.props.useMultiplePlayerScripts;

    if (!isUsingMultiplePlayerScripts && isJWPlayerScriptLoaded) {
      this._initialize();
      return;
    }

    if (isUsingMultiplePlayerScripts && existingScript) {
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
      existingScript.onload = getCurriedOnLoad(existingScript, this._initialize);
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
