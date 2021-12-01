import ReactJWPlayer from '..';
import { callbackToEventMap, ReactJWPlayerProps } from '../types';
import { PlayerOpts } from './get-player-opts';


type InitializeArgType = { 
  component: ReactJWPlayer;
  player: jwplayer.JWPlayer;
  playerOpts: PlayerOpts; };

function initialize({ component, player, playerOpts }: InitializeArgType): void {
  console.info('Init player');
  function onBeforePlay(event: Event): void {
    component.eventHandlers.onBeforePlay(event, player);
  }

  player.setup( playerOpts );

  const eventsToInitialize: { [key in keyof jwplayer.EventParams]? : unknown }  = {};

  Object.keys(component.props).forEach(prop => {
    const eventName = callbackToEventMap[prop as keyof ReactJWPlayerProps];

    if (eventName) {
      eventsToInitialize[eventName] = component.props[prop as keyof ReactJWPlayerProps];
    }
  });

  eventsToInitialize.adPlay = component.eventHandlers.onAdPlay;
  eventsToInitialize.fullscreen = component.eventHandlers.onFullScreen;
  eventsToInitialize.mute = component.eventHandlers.onMute;
  eventsToInitialize.play = component.eventHandlers.onPlay;
  eventsToInitialize.playlistItem = component.eventHandlers.onVideoLoad;
  eventsToInitialize.time = component.eventHandlers.onTime;


  // if (component.props.onMute)
  //   player.on('mute', component.props.onMute);

  // if (component.props.onPlay)
  //   player.on('play', component.props.onPlay);

  // if (component.props.onReady)
  //   player.on('ready', component.props.onReady);

  (Object.keys(component.props) as Array<keyof ReactJWPlayerProps>).forEach(callbackName => {
    const eventName = callbackToEventMap[callbackName];
    if (eventName) {
      const callback = component.props[callbackName] as jwplayer.EventCallback<jwplayer.EventParams[typeof eventName]>;
      player.on(eventName, callback);
    }
  }
  );
}

export default initialize;
