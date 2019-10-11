import config from '../config';

const initialState = {
  winner: null,
  winnerTimestamp: null,
  teamLogged: {},
};
let state = JSON.parse(JSON.stringify(initialState));

function teamPressedButton(server, teamKey) {
  if (!server.ready) {
    return;
  }

  const { winner, winnerTimestamp, teamLogged } = state;
  if (!winner) {
    server.send({ teamKey, eventKey: 'winner' });
    state.winner = teamKey;
    state.winnerTimestamp = new Date().getTime();
    state.teamLogged[teamKey] = true;

    setTimeout(() => {
      state = JSON.parse(JSON.stringify(initialState));
      // eslint-disable-next-line no-console
      console.log('Ready, sir!');
    }, config.refreshTime || 10000);
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
