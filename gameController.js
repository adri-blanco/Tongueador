const initialState = {
  winner: null,
  winnerTimestamp: null,
  teamLogged: {},
};
let state = initialState;

function teamPressedButton(server, teamKey) {
  const { winner, winnerTimestamp, teamLogged } = state;
  if (!winner) {
    server.send({ winner: teamKey, status: 'winner' });
    state.winner = teamKey;
    state.winnerTimestamp = new Date().getTime();
    state.teamLogged[teamKey] = true;

    setTimeout(() => {
      state = initialState;
      // eslint-disable-next-line no-console
      console.log('Ready, sir!');
    }, 10000);
  }

  if (winner !== teamKey && !teamLogged[teamKey]) {
    const differenceWithWinner = new Date().getTime() - winnerTimestamp;
    server.send({
      teamKey,
      difference: differenceWithWinner,
    });

    state.teamLogged[teamKey] = true;
  }
}

function GameController(server) {
  return {
    teamPressedButton: teamKey => teamPressedButton(server, teamKey),
  };
}

export default GameController;
