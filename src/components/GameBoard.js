import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { useSelector } from 'react-redux';
import GameConfiguration from '../config';
import TeamCard from './TeamCard';
import WinnerSection from './WinnerSection';
import PlayerUtils from '../utils/player';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  teamCardContainer: {
    width: `${100 / Math.round(PlayerUtils.teamsLength() / 2)}%`,
    height: '45%',
  },
  teamCardContainerTwoTeams: {
    width: '50%',
    height: '50%',
  },
};

function renderTeamCards(classes, teams) {
  return Object.keys(teams).map(teamKey => {
    const team = teams[teamKey];
    const teamsLength = PlayerUtils.teamsLength();
    return (
      <div
        key={teamKey}
        className={
          teamsLength === 2
            ? classes.teamCardContainerTwoTeams
            : classes.teamCardContainer
        }
      >
        <TeamCard
          name={team.teamName}
          logo={team.logo}
          points={team.points}
          color={team.color}
        />
      </div>
    );
  });
}

function GameBoard({ classes }) {
  const state = useSelector(modelState => modelState.GameModel);
  const { teams } = GameConfiguration;

  return (
    <div className={classes.container}>
      {!teams && (
        <span>Configuration needed. Execute npm run config to fix this.</span>
      )}
      {!state.winner && renderTeamCards(classes, teams)}
      {state.winner && (
        <WinnerSection winner={state.winner} differences={state.differences} />
      )}
    </div>
  );
}

GameBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameBoard);
