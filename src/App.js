import React from 'react';
import { Provider } from 'react-redux';
import store from './models/index';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
}

export default App;
