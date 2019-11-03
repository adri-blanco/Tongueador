const GameModel = {
  state: {
    winner: null,
    winnerTimestamp: null,
    teamsLogged: {},
    differences: {},
  },
  reducers: {
    teamPressedButton(state, teamKey) {
      if (!state.winner) {
        return {
          ...state,
          winner: teamKey,
          winnerTimestamp: new Date().getTime(),
          teamsLogged: {
            ...state.teamsLogged,
            [teamKey]: true,
          },
        };
      }

      if (state.winner !== teamKey && !state.teamLogged[teamKey]) {
        const differenceWithWinner =
          new Date().getTime() - state.winnerTimestamp;
        return {
          ...state,
          teamsLogged: {
            ...state.teamsLogged,
            [teamKey]: true,
          },
          differences: {
            ...state.differences,
            [teamKey]: differenceWithWinner,
          },
        };
      }

      return state;
    },
  },
};

export default GameModel;
