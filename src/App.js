import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import GameConfiguration from './config';
import TeamCard from './components/TeamCard';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
};

function renderTeamCards(teams) {
  return Object.keys(teams).map(teamKey => {
    const team = teams[teamKey];
    return (
      <TeamCard
        key={teamKey}
        name={team.teamName}
        logo={team.logo}
        points={team.points}
      />
    );
  });
}

function renderWinner(winner) {
  return (
    <div>
      <span>{winner}</span>
    </div>
  );
}

function App({ classes }) {
  const [state, setState] = useState({});
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const server = new WebSocket('ws://127.0.0.1:3500');
    server.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.eventKey === 'winner') {
        setState({
          winner: data.teamKey,
          differences: [],
        });
      } else {
        setState({
          winner: state.winner,
          differences: [...state.differences, data.difference],
        });
      }
    };
  }, []);
  const { teams } = GameConfiguration;

  return (
    <div className={classes.container}>
      {!teams && (
        <span>Configuration needed. Execute npm run config to fix this.</span>
      )}
      {!state.winner && renderTeamCards(teams)}
      {state.winner && renderWinner(state.winner, state.differences)}
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
