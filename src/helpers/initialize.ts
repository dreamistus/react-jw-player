import React from 'react';
import ReactJWPlayer from '..';
import { eventMap, PlayerEvent, ReactJWPlayerProps } from '../types';

import getEventNameFromProp from './get-event-name-from-prop';
import { PlayerOpts } from './get-player-opts';


type InitializeArgType = { 
  component: ReactJWPlayer;
  player: jwplayer.JWPlayer;
  playerOpts: PlayerOpts; };

function initialize({ component, player, playerOpts }: InitializeArgType): void {
  function onBeforePlay(event: Event): void {
    component.eventHandlers.onBeforePlay(event, player);
  }

  player.setup(playerOpts);

  const eventsToInitialize: { [key in keyof jwplayer.EventParams]? : unknown }  = {};

  Object.keys(component.props).forEach(prop => {
    const eventName = eventMap[prop as keyof ReactJWPlayerProps];

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


  //TODO: fix event handlers
  (Object.keys(eventsToInitialize)  as Array<keyof jwplayer.EventParams>).forEach(event => {
    player.on(event, () => {});
  });
}

export default initialize;
