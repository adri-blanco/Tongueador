import { init } from '@rematch/core';
import GameModel from './game-model';

const store = init({
  models: {
    GameModel,
  },
});

export const { dispatch } = store;
export default store;
