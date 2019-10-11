import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const styles = {
  container: {
    display: 'flex',
    width: '80%',
    height: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: props => `url(${props.winner.logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  winnenName: {
    fontSize: '17vw',
    borderRadius: '15px',
    padding: '10px',
    backgroundColor: props => props.winner.color,
    marginBottom: '20px',
  },
  differenceText: {
    fontSize: '5vw',
    backgroundColor: props => props.winner.color,
    marginBottom: '10px',
  },
};

function getBackground({ color }) {
  return {
    backgroundColor: color,
  };
}

function getDifferenceText(differenceInMs) {
  const seconds = Math.trunc(differenceInMs / 1000);
  const miliseconds = differenceInMs % 1000;
  let result = '';
  if (seconds !== 0) {
    result = `${seconds} s `;
  }
  return `${result}${miliseconds} ms`;
}

function WinnerSection({ classes, winner, differences }) {
  const { teamName } = winner;
  return (
    <div className={classes.container}>
      <span className={classes.winnenName}>{teamName}</span>
      {differences.map(difference => {
        return (
          <span
            key={difference.teamKey}
            className={classes.differenceText}
            style={getBackground(difference)}
          >
            {`${difference.teamName} - ${getDifferenceText(
              difference.difference
            )}`}
          </span>
        );
      })}
    </div>
  );
}

WinnerSection.propTypes = {
  classes: PropTypes.object.isRequired,
  winner: PropTypes.shape({
    teamName: PropTypes.string,
    logo: PropTypes.string,
    points: PropTypes.number,
  }).isRequired,
  differences: PropTypes.arrayOf(
    PropTypes.shape({
      teamKey: PropTypes.string.isRequired,
      difference: PropTypes.number.isRequired,
    })
  ),
};

WinnerSection.defaultProps = {
  differences: [],
};

export default withStyles(styles)(WinnerSection);
