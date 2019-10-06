import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import GameConfiguration from './config';
import TeamCard from './components/TeamCard';
import WinnerSection from './components/WinnerSection';

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

// eslint-disable-next-line
const server = new WebSocket('ws://127.0.0.1:3500');

function App({ classes }) {
  const [state, setState] = useState({});
  function setWinner(winner) {
    setState({
      winner,
      differences: [],
    });
  }
  function pushDifferences(newDifference) {
    setState({
      ...state,
      differences: [...state.differences, newDifference],
    });
  }
  server.onmessage = function onMessage(event) {
    const data = JSON.parse(event.data);
    if (data.eventKey === 'winner') {
      setWinner(data.teamKey);
    } else {
      pushDifferences(data);
    }
  };

  const { teams } = GameConfiguration;
  return (
    <div className={classes.container}>
      {!teams && (
        <span>Configuration needed. Execute npm run config to fix this.</span>
      )}
      {!state.winner && renderTeamCards(teams)}
      {state.winner && (
        <WinnerSection winner={state.winner} differences={state.differences} />
      )}
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
