/* eslint-disable no-param-reassign */
import { ExtendedWindow, PlayerConfigs } from '../types';

type SetJWPlayerDefaultsArgs = {
  playerId: string; 
  context: Window & typeof globalThis;
};



const setJWPlayerDefaults = ({ context, playerId }: SetJWPlayerDefaultsArgs): void => {
  const extendedWindow = context as ExtendedWindow;
  const playerConfigs: PlayerConfigs 
  = extendedWindow.__JW_PLAYER_CONFIGS__ 
  = (extendedWindow.__JW_PLAYER_CONFIGS__ || {});

  const existingConfig = playerConfigs[playerId];


  //TODO: check jwplayer source code
  // if (existingConfig) {
  // extendedWindow.jwplayer.defaults = existingConfig;
  // } else {
  // playerConfigs[playerId] = extendedWindow.jwplayer.defaults;
  // }
};

export default setJWPlayerDefaults;
