import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

function WinnerSection({ classes, winner, differences }) {
  return (
    <div className={classes.container}>
      <span>{winner}</span>
      {differences.map(difference => {
        return (
          <span key={difference.teamKey}>
            {`${difference.teamKey} ${difference.difference}`}
          </span>
        );
      })}
    </div>
  );
}

WinnerSection.propTypes = {
  classes: PropTypes.object.isRequired,
  winner: PropTypes.string.isRequired,
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
